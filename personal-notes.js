const unsavedCourseNotes = new Map();

function noteButton(week, block, label) {
 return '<course-note data-id="w'+week+'-'+block+'" aria-label="'+escapeText(label).replaceAll('"','&quot;')+'"></course-note>';
}

customElements.define('course-note', class extends HTMLElement {
 connectedCallback() {
  if (this.firstChild) return;
  const key = 'dm.personal-note.v1.' + this.dataset.id;
  const label = this.getAttribute('aria-label');
  const button = document.createElement('button');
  const panel = document.createElement('div');
  const field = document.createElement('textarea');
  const status = document.createElement('small');
  button.type = 'button';
  panel.id = 'note-' + this.dataset.id;
  panel.hidden = true;
  button.setAttribute('aria-controls', panel.id);
  button.setAttribute('aria-expanded', 'false');
  field.setAttribute('aria-label', label);
  field.placeholder = label + '…';
  field.rows = 4;
  status.setAttribute('role','status');
  const refresh = () => {
   button.textContent = panel.hidden ? (field.value ? '查看筆記' : '寫筆記') : '收合筆記';
   button.setAttribute('aria-label', button.textContent + ' · ' + label);
  };
  const read = () => {
   if (unsavedCourseNotes.has(key)) field.value = unsavedCourseNotes.get(key);
   else try { field.value = localStorage.getItem(key) || ''; }
   catch { status.textContent = '這個瀏覽器無法儲存筆記。'; }
   refresh();
  };
  button.onclick = () => {
   if (panel.hidden) read();
   panel.hidden = !panel.hidden;
   button.setAttribute('aria-expanded', String(!panel.hidden));
   refresh();
   if (!panel.hidden) field.focus();
  };
  field.oninput = () => {
   try {
    if (field.value) localStorage.setItem(key, field.value);
    else localStorage.removeItem(key);
    unsavedCourseNotes.delete(key);
    status.textContent = field.value ? '已儲存在此瀏覽器' : '筆記已清空';
   } catch {
    unsavedCourseNotes.set(key, field.value);
    status.textContent = '目前只能在本次閱讀保留，關閉前請複製筆記。';
   }
  };
  panel.append(field, status);
  this.append(button, panel);
  read();
 }
});
