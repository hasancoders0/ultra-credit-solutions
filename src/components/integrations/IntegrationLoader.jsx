
"use client";

import { useEffect } from "react";
import { defaultIntegrationSettings } from "@/data/settings";

function activateScripts(node, integrationId, addedElements) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return node.cloneNode(true);
  }

  if (node.tagName.toLowerCase() === "script") {
    const script = document.createElement("script");

    Array.from(node.attributes).forEach((attribute) => {
      script.setAttribute(attribute.name, attribute.value);
    });

    script.dataset.integrationId = integrationId;

    if (node.src) {
      script.src = node.src;
    } else {
      script.textContent = node.textContent;
    }

    addedElements.push(script);

    return script;
  }

  const clone = node.cloneNode(false);
  clone.dataset.integrationId = integrationId;

  Array.from(node.childNodes).forEach((child) => {
    clone.appendChild(
      activateScripts(child, integrationId, addedElements)
    );
  });

  return clone;
}

export default function IntegrationLoader() {
  useEffect(() => {
    const integrations = defaultIntegrationSettings.filter(
      (integration) =>
        integration.enabled &&
        typeof integration.configuration?.code === "string" &&
        integration.configuration.code.trim()
    );

    const addedElements = [];

    integrations.forEach((integration) => {
      const { code, placement = "body-end" } =
        integration.configuration;

      const template = document.createElement("template");
      template.innerHTML = code;

      const target =
        placement === "head"
          ? document.head
          : document.body;

      const fragment = document.createDocumentFragment();

      Array.from(template.content.childNodes).forEach((node) => {
        fragment.appendChild(
          activateScripts(
            node,
            integration.providerId,
            addedElements
          )
        );
      });

      const insertedNodes = Array.from(fragment.childNodes);

      if (placement === "body-start") {
        target.prepend(fragment);
      } else {
        target.appendChild(fragment);
      }

      addedElements.push(...insertedNodes);
    });

    return () => {
      addedElements.forEach((element) => element.remove());
    };
  }, []);

  return null;
}
