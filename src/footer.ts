import { appConfig } from "./app.config";

export function createFooter() {
  const footer = document.createElement('footer');
  footer.style.position = 'fixed';
  footer.style.bottom = '0';
  footer.style.left = '0';
  footer.style.width = '100vw';
  footer.style.backgroundColor = '#333';
  footer.style.color = '#fff';
  footer.style.padding = '1rem';
  footer.style.textAlign = 'center';

  footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} ${appConfig.name} v${appConfig.version}</p>
  `;
  document.body.appendChild(footer);
}