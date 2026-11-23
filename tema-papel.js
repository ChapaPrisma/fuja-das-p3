// Tema "caderno de estudo" (prévia): o marca-texto passa por trás de "P3" na home e do nome da matéria.
// Um só movimento por página. Sem GSAP ou com movimento reduzido, o destaque já aparece pronto.
(function () {
  var raiz = document.documentElement;
  var alvo = document.querySelector(".hero h1 .p3");
  if (!alvo) {
    var t = document.getElementById("titulo");
    if (t && t.textContent) { var s = document.createElement("span"); s.textContent = t.textContent; t.textContent = ""; t.appendChild(s); alvo = s; }
  }
  if (alvo) alvo.classList.add("mt");

  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (alvo && window.gsap && !reduz) {
    var mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      gsap.set(alvo, { "--mt-p": 0 });   // começa vazio antes de liberar a classe de espera
      gsap.to(alvo, { "--mt-p": 1, duration: 0.85, delay: 0.25, ease: "power2.inOut" });
      raiz.classList.remove("mt-espera");
    });
  } else {
    raiz.classList.remove("mt-espera");
  }

  // aviso de prévia, com link para a mesma página na estética atual (só nas páginas em /novo/)
  if (location.pathname.indexOf("/novo/") < 0) return;
  var atual = location.pathname.replace("/novo/", "/");
  var aviso = document.createElement("div");
  aviso.className = "previa-aviso"; aviso.setAttribute("role", "note");
  aviso.innerHTML = '<span>Prévia da nova estética</span><a href="' + atual + location.hash + '">Ver a estética atual</a><button type="button" aria-label="Fechar aviso de prévia">×</button>';
  aviso.querySelector("button").addEventListener("click", function () { aviso.remove(); });
  document.body.appendChild(aviso);
})();
