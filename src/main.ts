interface IApp {
  name: string;
  version: string;
}

const app: IApp = {
  name: 'Sample App',
  version: '0.0.1',
};

function main() {
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
    <p>&copy; ${new Date().getFullYear()} ${app.name} v${app.version}</p>
  `;
  document.body.appendChild(footer);
}

main();