'use strict';
const plate = document.querySelector('#hero-plate');
const scenarioText = document.querySelector('#scenario-description');
document.querySelectorAll('[data-set-scenario]').forEach(button => {
  button.addEventListener('click', () => {
    const scenario = button.dataset.setScenario;
    plate.dataset.scenario = scenario;
    document.querySelectorAll('[data-set-scenario]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    scenarioText.textContent = scenario === 'A'
      ? 'Слева нагревается один из четырёх источников. Тепло уходит к синему участку на правом краю.'
      : 'Теперь сильнее нагревается источник справа сзади. Путь меняется, а форма пластины остаётся прежней.';
    document.querySelector('.scenario-a').setAttribute('aria-hidden', String(scenario !== 'A'));
    document.querySelector('.scenario-b').setAttribute('aria-hidden', String(scenario !== 'B'));
  });
});
const contrast = document.querySelector('#contrast');
if (contrast) {
  contrast.addEventListener('input', () => {
    document.querySelector('#contrast-value').value = contrast.value;
    document.querySelector('#contrast-line').style.opacity = String(.15 + .85 * (Number(contrast.value) - 1) / 15);
  });
}
const groups = document.querySelector('#groups');
const cells = [...document.querySelectorAll('#zone-grid i')];
function updateGroups() {
  const count = Number(groups.value);
  cells.forEach((cell, index) => {
    const group = Math.floor(index / (16 / count));
    cell.style.backgroundColor = `hsl(${195 + group * 19} 22% ${84 - (group % 3) * 8}%)`;
    cell.textContent = String(group + 1);
    cell.style.cssText += ';font:10px/16px Segoe UI,sans-serif;text-align:center;font-style:normal;color:#202e32';
  });
  document.querySelector('#groups-description').textContent = count === 16 ? '16 групп: каждый участок управляется отдельно.' : `${count} групп: по ${16 / count} участков с общим состоянием.`;
}
if (groups) {
  groups.addEventListener('change', updateGroups);
  updateGroups();
}

const generationCopy = {
  0: 'Поколение 0. Разрозненные участки: отправная точка условного поиска.',
  10: 'Поколение 10. В условном примере появляются короткие локальные связи.',
  30: 'Поколение 30. Несколько связей складываются в общие пути; отдельные участки ещё разобщены.',
  100: 'Поколение 100. Условный финал: связная структура с ответвлениями к источникам. Её тепловое качество не рассчитано.'
};
document.querySelectorAll('[data-generation]').forEach(button => {
  button.addEventListener('click', () => {
    const generation = button.dataset.generation;
    document.querySelectorAll('[data-frame]').forEach(frame => {
      frame.toggleAttribute('hidden', frame.dataset.frame !== generation);
    });
    document.querySelectorAll('[data-generation]').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelector('#generation-description').textContent = generationCopy[generation];
  });
});
