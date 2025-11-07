const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const toggleThemeButton = document.querySelector("#toggle-theme");
const navLinks = document.querySelectorAll(".nav-list a");
const headerEl = document.querySelector("header");

if (abrir && nav && cerrar && toggleThemeButton) {
	abrir.setAttribute("aria-expanded", "false");
	cerrar.setAttribute("aria-expanded", "true");
	toggleThemeButton.setAttribute("aria-pressed", "false");

	abrir.addEventListener("click", () => {
		nav.classList.add("visible");
		if (headerEl) headerEl.classList.add("menu-open");
		abrir.style.display = "none";
		toggleThemeButton.style.display = "none";
		abrir.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
		const firstLink = nav.querySelector(".nav-list a");
		if (firstLink) firstLink.focus();
	});

	cerrar.addEventListener("click", () => {
		nav.classList.remove("visible");
		if (headerEl) headerEl.classList.remove("menu-open");
		abrir.style.display = "flex";
		toggleThemeButton.style.display = "flex";
		abrir.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
		abrir.focus();
	});

	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			if (nav.classList.contains("visible")) {
				nav.classList.remove("visible");
				if (headerEl) headerEl.classList.remove("menu-open");
				abrir.style.display = "flex";
				toggleThemeButton.style.display = "flex";
				abrir.setAttribute("aria-expanded", "false");
				document.body.style.overflow = "";
			}
		});
	});

	toggleThemeButton.addEventListener("click", () => {
		document.body.classList.toggle("dark-mode");
		const isDarkMode = document.body.classList.contains("dark-mode");
		toggleThemeButton.innerHTML = isDarkMode
			? '<i class="bi bi-sun" aria-hidden="true"></i>'
			: '<i class="bi bi-moon" aria-hidden="true"></i>';
		toggleThemeButton.setAttribute("aria-pressed", String(isDarkMode));
	});
}

(function backToTopInit() {
	const btt = document.querySelector("#back-to-top");
	if (!btt) return;
	const showAt = 220;
	window.addEventListener("scroll", () => {
		if (window.scrollY > showAt) btt.classList.add("show");
		else btt.classList.remove("show");
	});
	btt.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		btt.blur();
	});
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
	a.addEventListener("click", (e) => {
		const href = a.getAttribute("href");
		if (href.length > 1) {
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: "smooth", block: "start" });
				target.setAttribute("tabindex", "-1");
				target.focus({ preventScroll: true });
			}
		}
	});
});