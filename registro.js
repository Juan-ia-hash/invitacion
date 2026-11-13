const form = document.querySelector('#formulario');
const fields = [...form.querySelectorAll('input')];

function validateName(field) {
  const error = document.querySelector('#' + field.getAttribute('aria-describedby'));
  const name = field.value.trim().replace(/\s+/gu, ' ');
  field.setAttribute('aria-invalid', String(!name));
  error.textContent = name ? '' : 'Ingresa el nombre completo.';
  return name;
}

function eventTime() {
  const [clock, period] = document.querySelector('#hora').textContent.trim().match(/^\d{1,2}:\d{2}|[AP]M$/gi);
  const [hours, minutes] = clock.split(':');
  return Number(hours) + ':' + minutes + ' ' + period[0].toLowerCase() + '. m.';
}

for (const field of fields) {
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateName(field);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const names = fields.map(validateName);
  const missing = names.indexOf('');
  if (missing !== -1) {
    fields[missing].focus();
    return;
  }

  fields.forEach((field, index) => { field.value = names[index]; });
  const title = document.querySelector('#titulo').textContent.trim().replace(/\s+/gu, ' ');
  const day = document.querySelector('#dia').textContent.toLowerCase();
  const date = document.querySelector('#numero').textContent;
  const month = document.querySelector('#mes').textContent.toLowerCase();
  const message = [
    'Hola, queremos confirmar nuestra asistencia a la ' + title + ' del ' + day + ' ' + date + ' de ' + month + ' a las ' + eventTime(),
    '',
    'Asistiremos:',
    '• ' + names[0],
    '• ' + names[1],
    '',
    'Gracias.'
  ].join('\n');
  const whatsapp = document.querySelector('#whatsapp').href;
  window.open(whatsapp + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
});
form.querySelector('fieldset').disabled = false;

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
