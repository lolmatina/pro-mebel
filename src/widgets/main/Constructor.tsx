import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Constructor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const params = decodeURIComponent(window.location.search.substring(1));

    const iframe = document.createElement("iframe");
    iframe.id = "planplace";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.minHeight = "700px";
    iframe.style.border = "0";

    let src = "https://planplace.ru/clients/184654027/";
    if (params) {
      src += `?${params}`;
    }
    iframe.src = src;

    //@ts-ignore
    containerRef?.current?.appendChild(iframe);

    return () => {
      if (containerRef && containerRef.current)
        //@ts-ignore
        containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <motion.div
      className="max-w-360 mx-auto px-4 lg:px-15"
      id="constructor"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
    </motion.div>
  );
};
