// app.js — leichte Interaktivität: Tabs, Formspree-Switch, kleine UX-Verbesserungen
document.addEventListener('DOMContentLoaded', () => {
  // Tab-Logik
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deaktiviere alle
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(p => { p.classList.remove('active'); p.hidden = true; });

      // Aktiviere
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      const targetId = tab.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      if(panel){
        panel.classList.add('active');
        panel.hidden = false;
        // focus für a11y
        panel.setAttribute('tabindex','-1');
        panel.focus();
      }
    });
  });

  // Formspree: Wenn Nutzer Formspree möchte, wird das form action angepasst (nur Beispiel).
  const useFormspree = document.getElementById('useFormspree');
  const contactForm = document.getElementById('contactForm');

  useFormspree.addEventListener('click', () => {
    // Beispiel: Formspree endpoint (hier Platzhalter). Ersetze mit deinem Formspree endpoint.
    const formspreeEndpoint = 'https://formspree.io/f/yourFormId';
    if(!confirm('Die Nachricht wird über Formspree (externer Dienst) gesendet. Fortfahren?')) return;
    contactForm.setAttribute('action', formspreeEndpoint);
    contactForm.setAttribute('method','POST');
    contactForm.setAttribute('enctype','application/x-www-form-urlencoded');
    alert('Formular wurde für Formspree vorbereitet. Bitte überprüfe die Angaben und klicke erneut auf "Nachricht senden".');
  });

  // Formularvalidierung: einfache Bestätigung vor Abschicken (mailto oder Formspree)
  contactForm.addEventListener('submit', (e) => {
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      e.preventDefault();
      alert('Bitte fülle alle Felder aus.');
      return;
    }
    // Für mailto: keine weitere Aktion — Mailclient öffnet sich
    // Für Formspree: Standard POST wird ausgeführt
    // Kleiner visual feedback:
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Wird gesendet…';
    // Falls mailto: wir lassen Mailclient übernehmen; falls Formspree: Form wird normal abgeschickt
    setTimeout(()=> {
      btn.disabled = false;
      btn.textContent = 'Nachricht senden';
    }, 2000);
  });

  // Kleine progressive enhancement: smooth-scroll für interne Links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
