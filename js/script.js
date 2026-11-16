

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Mobile nav */
  const burger = $('#burger'), links = $('#navLinks');
  const setNav = open => {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', () => setNav(!links.classList.contains('open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setNav(false)));

  /* FAQ accordion (one open at a time) */
  $$('.acc__q').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.parentElement, willOpen = !item.classList.contains('open');
    $$('.acc__i').forEach(i => {
      i.classList.remove('open');
      $('.acc__q', i).setAttribute('aria-expanded', 'false');
    });
    if (willOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  }));

  /* Programs slider */
  const PIC = ['assets/images/servicepic1.jpg', 'assets/images/servicepic3.jpg', 'assets/images/servicepic2.jpg'];
  const programs = [
    { ico: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>', tag: '1-on-1 Guidance', title: 'One-on-One Coaching', img: PIC[0],
      desc: 'Experience the power of personalized attention. Our one-on-one coaching sessions are crafted to your specific needs, ensuring rapid progress, iron discipline, and lasting results.',
      list: ['Customized workout plans adapted weekly', 'Precision nutrition & macro guidance', 'Regular biometric & body composition tracking', '24/7 dedicated coach messaging access'] },
    { ico: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.3c2.2.7 3.5 2.6 3.5 5.7"/>', tag: 'Group Energy', title: 'Group Training Classes', img: PIC[1],
      desc: 'Train alongside a motivated community. From HIIT to strength circuits, every class is coach-led and scaled to your level.',
      list: ['50+ weekly classes for every level', 'Coach-led form corrections', 'Small groups for real attention', 'Free class booking in the app'] },
    { ico: '<path d="M12 7c-2-2-6-1.5-7 2-1 3.5 1 9 4 11 1.2.8 2 .5 3 0s1.8.8 3 0c3-2 5-7.5 4-11-1-3.5-5-4-7-2z"/><path d="M12 7c0-2 1-4 3-5"/>', tag: 'Nutrition', title: 'Nutrition & Wellness Plans', img: PIC[2],
      desc: 'Fuel your training with a plan built for your body, schedule, and goals, backed by regular check-ins.',
      list: ['Custom meal & macro plans', 'Weekly check-ins with a specialist', 'Supplement and recovery guidance', 'Grocery and meal-prep tips'] }
  ];
  let p = 0;
  const renderProgram = () => {
    const d = programs[p];
    $('#progImg').src = d.img;
    $('#progIco').innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + d.ico + '</svg>';
    $('#progTag').textContent = d.tag;
    $('#progTitle').textContent = d.title;
    $('#progDesc').textContent = d.desc;
    $('#progList').innerHTML = d.list.map(t => `<li>${t}</li>`).join('');
  };
  $('#progPrev').addEventListener('click', () => { p = (p - 1 + programs.length) % programs.length; renderProgram(); });
  $('#progNext').addEventListener('click', () => { p = (p + 1) % programs.length; renderProgram(); });
  renderProgram();

  /* Testimonials */
  const AV = ['assets/images/testimonygym1.jpg', 'assets/images/testimonygym2.jpg', 'assets/images/testimonygym3.jpg'];
  const reviews = [
    { a: AV[0], n: 'Sarah M.', r: 'Lost 22 lbs & Built Confidence', t: '"Joining Revamp was the absolute best decision I\'ve ever made for my health. In just 3 months, I not only lost 22 pounds of fat but also gained confidence and energy I never thought possible. The trainers are incredibly supportive, and the community keeps me motivated every single day."' },
    { a: AV[1], n: 'Daniel K.', r: 'Gained 12 lbs of Lean Muscle', t: '"I had trained alone for years and plateaued. My Revamp coach rebuilt my program from scratch and the results came fast. Stronger lifts, better form, and finally a plan I can trust."' },
    { a: AV[2], n: 'Priya R.', r: 'Complete Beginner to 5K Runner', t: '"I walked in nervous and unsure where to start. The free first session made it easy, and the coaches never made me feel out of place. Six months later I feel unstoppable."' }
  ];
  let r = 0;
  const renderReview = () => {
    const d = reviews[r];
    $('#tmText').textContent = d.t;
    $('#tmName').textContent = d.n;
    $('#tmRole').textContent = d.r;
    $('#tmAv').src = d.a;
    $('#tmAv').alt = d.n;
  };
  $('#tmPrev').addEventListener('click', () => { r = (r - 1 + reviews.length) % reviews.length; renderReview(); });
  $('#tmNext').addEventListener('click', () => { r = (r + 1) % reviews.length; renderReview(); });
  renderReview();

  /* Booking dialog + pricing buttons */
  const dlg = $('#book'), form = $('#bookForm'), msg = $('#bookMsg'), planEl = $('#bookPlan');
  const openBook = plan => {
    planEl.textContent = plan ? 'Selected: ' + plan : 'No plan selected yet. You can choose one after your free session.';
    msg.textContent = ''; form.reset();
    dlg.showModal();
  };
  $('#openBook').addEventListener('click', () => openBook(sessionStorage.getItem('plan')));
  $('#closeBook').addEventListener('click', () => dlg.close());
  $$('[data-plan]').forEach(b => b.addEventListener('click', () => {
    const plan = b.dataset.plan;
    sessionStorage.setItem('plan', plan);
    $('#ctaNote').textContent = plan + ' selected. Book your free first session to get started.';
    $('#cta').scrollIntoView({ behavior: 'smooth' });
  }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = new FormData(form).get('name');
    msg.textContent = `Thanks, ${name}! Your free session request is in. We'll email you to confirm.`;
    setTimeout(() => dlg.close(), 2200);
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  /* Carousel: duplicate items for a seamless loop */
  const mq = $('#marquee');
  mq.innerHTML += mq.innerHTML;

  /* Scroll reveal */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = [
    ['.head', ''], ['.vm', 'left'], ['.stat', 'zoom'], ['.prog', ''], ['.feat', ''], ['.why__img', 'zoom'],
    ['.coaches__text', 'left'], ['.coach', 'zoom'], ['.tm > div', 'left'], ['.quote', 'right'],
    ['.price', 'zoom'], ['.faq__intro', 'left'], ['.acc__i', ''], ['.cta', 'zoom'], ['.foot__in > div', '']
  ];
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  groups.forEach(([sel, dir]) => $$(sel).forEach((el, i) => {
    el.classList.add('reveal'); if (dir) el.classList.add(dir);
    el.style.transitionDelay = (i % 4) * 90 + 'ms';
    io.observe(el);
  }));

  /* Count-up numbers */
  const countIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const end = +e.target.dataset.count, t0 = performance.now(), dur = 1600;
    if (reduce) return;
    const tick = now => {
      const k = Math.min((now - t0) / dur, 1);
      e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    e.target.textContent = 0;
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => { if (!reduce) el.textContent = 0; countIO.observe(el); });
})();