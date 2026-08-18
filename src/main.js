import './styles.css';
import menuItems from './data/menu.json';
import { business, featuredDishes } from './content.js';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const icon = (name, className = '') => {
  const paths = {
    arrow: '<path d="M5 12h14M14 6l6 6-6 6"/>',
    arrowUp: '<path d="M5 19 19 5M9 5h10v10"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.61 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.28 1.73.49 2.63.61A2 2 0 0 1 22 16.92Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z"/>',
    tiktok: '<path d="M15 3v11.2a4.8 4.8 0 1 1-4.8-4.8M15 3c.7 2.4 2.3 4 5 4"/>',
    pause: '<path d="M9 6v12M15 6v12"/>',
    play: '<path d="m9 6 9 6-9 6Z"/>',
  };
  return `<svg class="${className}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
};

const weaveMark = (className = '') => `
  <svg class="${className}" aria-hidden="true" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="50" r="37" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 4"/>
    <path d="M50 16 62 38 84 50 62 62 50 84 38 62 16 50 38 38 50 16Z" stroke="currentColor" stroke-width="2"/>
    <path d="m50 31 7 12 12 7-12 7-7 12-7-12-12-7 12-7 7-12Z" fill="currentColor" opacity=".16" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="50" r="5" fill="currentColor"/>
  </svg>`;

const miniDishIcon = (type) => {
  const shapes = {
    platter: '<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="10"/><path d="m17 17 14 14M31 17 17 31"/>',
    leaf: '<path d="M39 8C19 8 9 20 11 38c18 2 30-8 28-30Z"/><path d="M13 36c8-10 14-14 24-22"/>',
    pepper: '<path d="M25 12c2-5 6-5 9-4"/><path d="M15 17c7-7 21-4 21 7 0 11-12 16-25 15 5-4 3-14 4-22Z"/>',
    sun: '<circle cx="24" cy="24" r="9"/><path d="M24 6v5M24 37v5M6 24h5M37 24h5M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4"/>',
    spark: '<path d="m24 5 4 14 14 5-14 5-4 14-5-14L5 24l14-5 5-14Z"/>',
    triangle: '<path d="m24 8 17 30H7L24 8Z"/><path d="M14 32h20M18 25h12"/>',
  };
  return `<svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${shapes[type]}</svg>`;
};

const categoryOrder = [
  'Combinations',
  'Meat Dishes',
  'Vegetarian Dishes',
  'Breakfast',
  'Side Orders',
  'Coffee & Tea',
  'Beverages',
];

const normalizedCategory = (category) => category;

const featuredDishCard = (dish, index, isClone = false) => `
  <article class="dish-card dish-${dish.color}" ${isClone ? 'aria-hidden="true"' : 'role="listitem"'}>
    <div class="dish-photo${dish.imageFit === 'contain' ? ' dish-photo--contain' : ''}">
      <img src="${escapeHtml(dish.image)}" alt="${isClone ? '' : escapeHtml(dish.imageAlt)}" loading="lazy">
      <div class="dish-index">0${index + 1}</div>
    </div>
    <div class="dish-copy">
      <p class="dish-note">${escapeHtml(dish.note)}</p>
      <h3>${escapeHtml(dish.name)}</h3>
      <p>${escapeHtml(dish.description)}</p>
      ${isClone
        ? `<span class="circle-button" aria-hidden="true">${icon('arrow', 'icon')}</span>`
        : `<button class="circle-button view-menu-trigger" type="button" data-menu-trigger aria-label="Open menu to find ${escapeHtml(dish.name)}">${icon('arrow', 'icon')}</button>`}
    </div>
  </article>`;

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="site-header" data-header>
    <div class="nav-shell">
      <a class="brand" href="#top" aria-label="Hagere Ethiopian Restaurant, home">
        <img class="brand-logo" src="/assets/pics/logo.png" alt="Hagere Ethiopian Restaurant" width="1682" height="935" fetchpriority="high" />
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="#favourites">Menu</a>
        <a href="#our-table">Our story</a>
        <a href="#coffee">Coffee</a>
        <a href="#visit">Visit</a>
      </nav>

      <div class="nav-actions">
        <button class="text-link view-menu-trigger" type="button" data-menu-trigger>View menu</button>
        <a class="button button-primary button-compact" href="${business.links.order}">Order takeout ${icon('arrow', 'icon')}</a>
        <button class="mobile-nav-button" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>${icon('menu', 'icon')}</button>
      </div>
    </div>

    <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
      <div class="mobile-nav-inner">
        <p class="eyebrow">Gather around</p>
        <a href="#favourites">Menu <span>01</span></a>
        <a href="#our-table">Our story <span>02</span></a>
        <a href="#coffee">Coffee <span>03</span></a>
        <a href="#visit">Visit <span>04</span></a>
        <button class="button button-outline view-menu-trigger" type="button" data-menu-trigger>Explore the full menu ${icon('arrow', 'icon')}</button>
        <a class="button button-primary" href="${business.links.order}">Order takeout ${icon('arrowUp', 'icon')}</a>
      </div>
    </div>
  </header>

  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="edge-weave edge-weave-left" aria-hidden="true">${weaveMark()}</div>
      <div class="hero-grid content-shell">
        <div class="hero-copy reveal">
          <p class="eyebrow location-line">${icon('pin', 'icon')} Sioux Falls, South Dakota</p>
          <h1 id="hero-title">Gather around the soul of <em>Ethiopian cooking.</em></h1>
          <div class="amharic-invite">
            <span lang="am">እንብላ</span>
            <span class="amharic-rule" aria-hidden="true"></span>
            <small>Let’s eat</small>
          </div>
          <p class="hero-intro">Fresh injera, richly spiced stews, vegetarian favourites, and shared traditions come together at Hagere in Sioux Falls.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${business.links.order}">Order takeout ${icon('arrowUp', 'icon')}</a>
            <button class="button button-outline view-menu-trigger" type="button" data-menu-trigger>View menu ${icon('arrow', 'icon')}</button>
          </div>
          <div class="hero-footnote">
            <span class="mini-weave">${weaveMark()}</span>
            <p><strong>Modern hospitality</strong><br />shaped by Ethiopian tradition.</p>
          </div>
        </div>

        <div class="hero-visual reveal" aria-label="Design concept imagery of an Ethiopian communal meal">
          <div class="hero-arch">
            <img src="/assets/generated/hero-platter-concept.webp" alt="Concept image of an abundant Ethiopian platter with injera, stews, vegetables, chicken and tibs" width="1536" height="1024" fetchpriority="high" />
            <span class="image-note">Concept image · owner photo to replace</span>
          </div>
          <div class="arch-thread" aria-hidden="true"><span></span></div>
          <div class="coffee-vignette">
            <img src="/assets/generated/coffee-hospitality-concept.webp" alt="Concept still life of a jebena and small coffee cups on a woven tray" width="1122" height="1402" />
            <div><span lang="am">ቡና</span><small>Coffee & connection</small></div>
          </div>
          <div class="floating-seal" aria-hidden="true">${weaveMark()}<span>HAGERE<br />SIOUX FALLS</span></div>
        </div>
      </div>
      <a class="scroll-cue" href="#favourites"><span>Scroll to gather</span><i></i></a>
    </section>

    <section class="favourites section" id="favourites" aria-labelledby="favourites-title">
      <div class="content-shell">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow">From Hagere's kitchen <span>01</span></p>
            <h2 id="favourites-title">A table with<br /><em>something for everyone.</em></h2>
          </div>
          <div class="section-heading-copy">
            <p>Build a shared spread from slow-simmered favourites, crisp tibs, and a remarkable range of vegetables.</p>
            <button class="menu-showcase-cta view-menu-trigger" type="button" data-menu-trigger>
              <span class="menu-showcase-cta__copy">
                <small>Discover every dish</small>
                <strong>Explore the full menu</strong>
                <span>${menuItems.length} authentic favourites</span>
              </span>
              <span class="menu-showcase-cta__arrow">${icon('arrowUp', 'icon')}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="dish-carousel reveal" data-dish-carousel aria-roledescription="carousel" aria-label="Featured dishes from Hagere's kitchen">
        <div class="dish-carousel-bar content-shell">
          <p><span aria-hidden="true"></span> Drag, swipe, or let the menu travel</p>
          <div class="dish-carousel-controls" aria-label="Featured menu controls">
            <button type="button" data-carousel-prev aria-label="Previous featured dish">${icon('arrow', 'icon')}</button>
            <button type="button" data-carousel-toggle aria-label="Pause featured menu carousel">${icon('pause', 'icon')}<span>Pause</span></button>
            <button type="button" data-carousel-next aria-label="Next featured dish">${icon('arrow', 'icon')}</button>
          </div>
        </div>
        <div class="dish-viewport" data-dish-viewport tabindex="0" aria-label="Featured dishes; scroll horizontally to browse">
          <div class="dish-track">
            <div class="dish-set" data-dish-set role="list">
              ${featuredDishes.map((dish, index) => featuredDishCard(dish, index)).join('')}
            </div>
            <div class="dish-set" aria-hidden="true">
              ${featuredDishes.map((dish, index) => featuredDishCard(dish, index, true)).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="meaning section" id="our-table" aria-labelledby="meaning-title">
      <div class="content-shell meaning-grid">
        <div class="art-gallery reveal" aria-label="A gallery of Ethiopian artwork displayed at Hagere">
          <figure class="art-frame art-frame-tall">
            <img src="/assets/pics/art.png" alt="Tall Ethiopian artwork depicting three traditional musicians" width="724" height="2172" loading="lazy" />
            <figcaption><span>01</span> Music & memory</figcaption>
          </figure>
          <figure class="art-frame art-frame-coffee">
            <img src="/assets/pics/art3.jpg" alt="Ethiopian artwork depicting a traditional coffee ceremony" width="540" height="720" loading="lazy" />
            <figcaption><span>02</span> Coffee & welcome</figcaption>
          </figure>
          <figure class="art-frame art-frame-injera">
            <img src="/assets/pics/art4.jpg" alt="Colourful Ethiopian artwork depicting injera being prepared" width="1024" height="1280" loading="lazy" />
            <figcaption><span>03</span> Craft & tradition</figcaption>
          </figure>
          <div class="art-gallery-seal" aria-hidden="true">${weaveMark()}<span>ART AT<br />HAGERE</span></div>
          <p class="art-gallery-caption"><strong>Stories on every wall.</strong><span>Art, food, and music carry home into the room.</span></p>
        </div>
        <div class="meaning-copy reveal">
          <p class="eyebrow light">Our table <span>02</span></p>
          <h2 id="meaning-title">A name that carries <em>home to every table.</em></h2>
          <p class="lead">Hagere <span lang="am">(ሀገሬ)</span> means “my country” in Amharic—a name filled with memory, belonging, and the unmistakable flavours of home.</p>
          <p>At our table, that feeling becomes an invitation: fresh injera at the centre, layers of flavour all around, and room for every hand to share.</p>
          <div class="welcome-lockup"><span lang="am">እንኳን ደህና መጡ</span><small>Welcome</small></div>
          <a class="arrow-link light" href="#gatherings">Discover the spirit of sharing ${icon('arrow', 'icon')}</a>
        </div>
      </div>
    </section>

    <section class="vegetarian section" id="vegetarian" aria-labelledby="vegetarian-title">
      <div class="content-shell vegetarian-grid">
        <div class="veg-copy reveal">
          <p class="eyebrow">Colour from the garden <span>03</span></p>
          <h2 id="vegetarian-title">A feast built from <em>lentils, greens, spices, and care.</em></h2>
          <p>Hagere’s menu makes vegetables the celebration—not the afterthought. Choose individual dishes or gather them into a colourful sampler.</p>
          <button class="button button-dark view-menu-trigger" type="button" data-menu-trigger>Explore vegetarian dishes ${icon('arrow', 'icon')}</button>
        </div>

        <div class="veg-photo-stage reveal">
          <div class="veg-photo-orbit" aria-hidden="true"></div>
          <figure class="veg-feast-photo">
            <img src="/assets/pics/food.png" alt="Overhead Ethiopian feast with colourful vegetables, lentils, stews and rolled injera arranged for sharing" width="1254" height="1254" loading="lazy" />
            <figcaption><small>One table · many flavours</small><strong>Made to share</strong></figcaption>
          </figure>
          <div class="veg-callout veg-callout-one"><i></i><span><strong>Misir Wat</strong><small>Red lentils + berbere</small></span></div>
          <div class="veg-callout veg-callout-two"><i></i><span><strong>Gomen</strong><small>Slow-cooked greens</small></span></div>
          <div class="veg-callout veg-callout-three"><i></i><span><strong>Tikil Gomen</strong><small>Cabbage + turmeric</small></span></div>
          <div class="veg-photo-seal" aria-hidden="true">${weaveMark()}<span>COLOUR<br />ON INJERA</span></div>
        </div>
      </div>
    </section>

    <section class="coffee section" id="coffee" aria-labelledby="coffee-title">
      <div class="coffee-background" aria-hidden="true"></div>
      <div class="content-shell coffee-grid">
        <div class="coffee-visual reveal">
          <div class="coffee-halo" aria-hidden="true"></div>
          <figure class="coffee-photo">
            <img src="/assets/pics/coffee.png" alt="Traditional Ethiopian coffee ceremony with a steaming jebena surrounded by small cups" width="1085" height="1450" loading="lazy" />
            <figcaption><span lang="am">ቡና</span><small>Prepared to be shared</small></figcaption>
          </figure>
          <div class="steam steam-one"></div><div class="steam steam-two"></div>
          <div class="coffee-ritual-card">
            <small>The rhythm of welcome</small>
            <div><span><i>01</i> Gather</span><span><i>02</i> Pour</span><span><i>03</i> Share</span></div>
          </div>
          <div class="coffee-ceremony-seal" aria-hidden="true">${weaveMark()}<span>SLOW<br />MOMENTS</span></div>
        </div>
        <div class="coffee-copy reveal">
          <p class="eyebrow light">Coffee & connection <span>04</span></p>
          <h2 id="coffee-title">Hospitality that <em>takes its time.</em></h2>
          <p class="lead">Across Ethiopia, coffee traditions create space for conversation, welcome, and connection.</p>
          <p>At Hagere, that same spirit shapes the dining experience: settle in, share a table, and let the conversation stretch a little longer.</p>
          <div class="coffee-note"><span>${miniDishIcon('spark')}</span><p>Traditional Ethiopian coffee served from a clay pot is listed on Hagere’s menu.</p></div>
        </div>
      </div>
    </section>

    <section class="gatherings section" id="gatherings" aria-labelledby="gatherings-title">
      <div class="content-shell">
        <div class="gathering-card reveal">
          <img src="/assets/pics/inside-new%20picture.png" alt="Inside Hagere Ethiopian Restaurant, showing the dining room, coffee bar and colourful Hagere sign" width="1774" height="887" loading="lazy" />
          <div class="gathering-overlay"></div>
          <div class="gathering-copy">
            <p class="eyebrow light">Bring everyone <span>05</span></p>
            <h2 id="gatherings-title">From dinner for two to the <em>whole celebration.</em></h2>
            <p>Shared platters, generous combinations, dine-in and takeout give every gathering a place at Hagere.</p>
            <a class="button button-ivory" href="${business.links.catering}">Call about groups ${icon('arrowUp', 'icon')}</a>
          </div>
          <div class="gathering-stamp" aria-hidden="true">${weaveMark()}<span>Gather<br />together</span></div>
        </div>
      </div>
    </section>

    <section class="visit section" id="visit" aria-labelledby="visit-title">
      <div class="content-shell visit-grid">
        <div class="visit-copy reveal">
          <p class="eyebrow">Visit us <span>06</span></p>
          <h2 id="visit-title">Your table is waiting on <em>Minnesota Avenue.</em></h2>
          <div class="visit-details">
            <div><span class="detail-icon">${icon('pin', 'icon')}</span><p><small>Find us</small><strong>${business.address.street}<br />${business.address.city}</strong></p></div>
            <div><span class="detail-icon">${icon('clock', 'icon')}</span><p><small>Published hours</small>${business.hours.map((row) => `<strong>${row.label}: ${row.value.replace('Daily · ', '')}</strong>`).join('')}</p></div>
            <div><span class="detail-icon">${icon('phone', 'icon')}</span><p><small>Call Hagere</small><a href="${business.phoneHref}">${business.phoneDisplay}</a></p></div>
          </div>
          <div class="visit-actions">
            <a class="button button-primary" href="${business.links.directions}" target="_blank" rel="noreferrer">Get directions ${icon('arrowUp', 'icon')}</a>
            <a class="button button-outline" href="${business.phoneHref}">Call us ${icon('phone', 'icon')}</a>
          </div>
        </div>

        <div class="map-art reveal">
          <iframe
            title="Google Map showing Hagere Ethiopian Restaurant at 2113 South Minnesota Avenue"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.0!2d-96.731712!3d43.525088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x878eb59ee4a97ff7%3A0xe78c438ee6f20c5e!2sHagere%20Ethiopian%20Restaurant!5e0!3m2!1sen!2sus!4v1787060000000!5m2!1sen!2sus"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="map-card">
            <span class="map-card__pin">${icon('pin', 'icon')}</span>
            <div><strong>Hagere Ethiopian Restaurant</strong><small>2113 S Minnesota Ave · Sioux Falls</small></div>
            <a href="${business.links.map}" target="_blank" rel="noreferrer" aria-label="Open Hagere Ethiopian Restaurant in Google Maps">Open Google Maps ${icon('arrowUp', 'icon')}</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-weave" aria-hidden="true">${weaveMark()}</div>
    <div class="content-shell">
      <div class="footer-top">
        <div>
          <a class="brand brand-light" href="#top" aria-label="Hagere Ethiopian Restaurant, back to top"><img class="brand-logo brand-logo-footer" src="/assets/pics/logo.png" alt="Hagere Ethiopian Restaurant" width="1682" height="935" loading="lazy" /></a>
          <p>Modern hospitality shaped by Ethiopian tradition.</p>
        </div>
        <div class="footer-invite"><span lang="am">እንብላ</span><small>Let’s eat.</small></div>
      </div>
      <div class="footer-grid">
        <div><p class="footer-label">Come gather</p><address>${business.address.street}<br />${business.address.city}</address><a href="${business.phoneHref}">${business.phoneDisplay}</a>${business.email ? `<a href="mailto:${business.email}">${business.email}</a>` : ''}</div>
        <div><p class="footer-label">Explore</p><a href="#favourites">Menu</a><a href="#our-table">Our story</a><a href="#coffee">Coffee</a><a href="#visit">Visit</a></div>
        <div><p class="footer-label">Hours</p>${business.hours.map((row) => `<p><span>${row.label}</span>${row.value}</p>`).join('')}</div>
        <div><p class="footer-label">Ready to order?</p><div class="socials">${business.links.instagram ? `<a href="${business.links.instagram}" aria-label="Instagram" target="_blank" rel="noreferrer">${icon('instagram', 'icon')}</a>` : ''}${business.links.facebook ? `<a href="${business.links.facebook}" aria-label="Facebook" target="_blank" rel="noreferrer">${icon('facebook', 'icon')}</a>` : ''}${business.links.tiktok ? `<a href="${business.links.tiktok}" aria-label="TikTok" target="_blank" rel="noreferrer">${icon('tiktok', 'icon')}</a>` : ''}</div><a class="button button-primary footer-order" href="${business.links.order}">Order takeout ${icon('phone', 'icon')}</a></div>
      </div>
      <div class="footer-bottom"><p>© ${new Date().getFullYear()} Hagere Ethiopian Restaurant</p><div><a href="${business.links.officialMenu}">Menu</a><a href="#privacy-note">Privacy</a><a href="#accessibility-note">Accessibility</a><span>Details reviewed ${business.verification.factsChecked}</span></div></div>
      <div class="footer-notes"><p id="privacy-note"><strong>Prototype privacy:</strong> this sample homepage does not collect or store visitor information.</p><p id="accessibility-note"><strong>Accessibility:</strong> keyboard navigation, visible focus, reduced-motion preferences, semantic headings and responsive text are supported. Contact Hagere by phone for service accommodations.</p></div>
    </div>
  </footer>

  <dialog class="menu-dialog" data-menu-dialog aria-labelledby="menu-dialog-title">
    <div class="menu-dialog-shell">
      <div class="menu-dialog-header">
        <div><p class="eyebrow">The current menu</p><h2 id="menu-dialog-title">Choose a seat.<br /><em>There’s room for every appetite.</em></h2></div>
        <button class="dialog-close" type="button" aria-label="Close menu" data-menu-close>${icon('close', 'icon')}</button>
      </div>
      <div class="menu-toolbar">
        <label class="menu-search">${icon('search', 'icon')}<span class="sr-only">Search the menu</span><input type="search" placeholder="Search all ${menuItems.length} items" data-menu-search /></label>
        <p><span data-menu-count>${menuItems.length}</span> current items · transcribed from Hagere’s printed menu</p>
      </div>
      <div class="category-tabs" role="tablist" aria-label="Filter menu by category">
        <button class="active" type="button" role="tab" aria-selected="true" data-category="all">All</button>
        ${categoryOrder.map((category) => `<button type="button" role="tab" aria-selected="false" data-category="${escapeHtml(category)}">${escapeHtml(normalizedCategory(category))}</button>`).join('')}
      </div>
      <div class="full-menu" data-menu-list></div>
      <div class="menu-dialog-footer"><p>Availability and prices may change. Please call Hagere to confirm your selections.</p><a class="button button-primary" href="${business.links.order}">Call Hagere ${icon('phone', 'icon')}</a></div>
    </div>
  </dialog>
`;

const menuDialog = document.querySelector('[data-menu-dialog]');
const menuList = document.querySelector('[data-menu-list]');
const menuSearch = document.querySelector('[data-menu-search]');
const menuCount = document.querySelector('[data-menu-count]');
let selectedCategory = 'all';

const renderMenu = () => {
  const query = menuSearch.value.trim().toLowerCase();
  const filtered = menuItems.filter((item) => {
    const inCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = !query || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
    return inCategory && matchesQuery;
  });
  const grouped = categoryOrder
    .map((category) => ({ category, items: filtered.filter((item) => item.category === category) }))
    .filter((group) => group.items.length);

  menuCount.textContent = filtered.length;
  menuList.innerHTML = grouped.length ? grouped.map((group) => `
    <section class="menu-group" aria-labelledby="menu-${group.category.replace(/[^a-z0-9]/gi, '-').toLowerCase()}">
      <div class="menu-group-heading"><p>${escapeHtml(normalizedCategory(group.category))}</p><span>${group.items.length} items</span></div>
      <div class="menu-items-grid">
        ${group.items.map((item) => `<article class="menu-item"><h3>${escapeHtml(item.name)}</h3>${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}</article>`).join('')}
      </div>
    </section>`).join('') : '<div class="empty-menu"><p>No dishes match that search.</p><button type="button" data-clear-search>Clear search</button></div>';

  menuList.querySelector('[data-clear-search]')?.addEventListener('click', () => {
    menuSearch.value = '';
    selectedCategory = 'all';
    document.querySelectorAll('[data-category]').forEach((tab) => {
      const active = tab.dataset.category === 'all';
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    renderMenu();
    menuSearch.focus();
  });
};

renderMenu();

document.querySelectorAll('[data-menu-trigger]').forEach((trigger) => trigger.addEventListener('click', () => {
  menuDialog.showModal();
  document.body.classList.add('no-scroll');
  document.querySelector('[data-mobile-nav]').hidden = true;
  document.querySelector('[data-nav-toggle]').setAttribute('aria-expanded', 'false');
  requestAnimationFrame(() => menuDialog.classList.add('open'));
}));

const closeMenu = () => {
  menuDialog.classList.remove('open');
  document.body.classList.remove('no-scroll');
  setTimeout(() => menuDialog.close(), 180);
};

document.querySelector('[data-menu-close]').addEventListener('click', closeMenu);
menuDialog.addEventListener('cancel', (event) => { event.preventDefault(); closeMenu(); });
menuDialog.addEventListener('click', (event) => { if (event.target === menuDialog) closeMenu(); });
menuSearch.addEventListener('input', renderMenu);
document.querySelectorAll('[data-category]').forEach((tab) => tab.addEventListener('click', () => {
  selectedCategory = tab.dataset.category;
  document.querySelectorAll('[data-category]').forEach((other) => {
    const active = other === tab;
    other.classList.toggle('active', active);
    other.setAttribute('aria-selected', String(active));
  });
  renderMenu();
}));

const navToggle = document.querySelector('[data-nav-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
navToggle.addEventListener('click', () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;
  navToggle.setAttribute('aria-expanded', String(willOpen));
  navToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
  navToggle.innerHTML = icon(willOpen ? 'close' : 'menu', 'icon');
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.innerHTML = icon('menu', 'icon');
}));

const header = document.querySelector('[data-header]');
const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 18);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const dishCarousel = document.querySelector('[data-dish-carousel]');
if (dishCarousel) {
  const viewport = dishCarousel.querySelector('[data-dish-viewport]');
  const firstSet = dishCarousel.querySelector('[data-dish-set]');
  const toggle = dishCarousel.querySelector('[data-carousel-toggle]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let manuallyPaused = prefersReducedMotion;
  let temporarilyPaused = false;
  let isVisible = true;
  let isDragging = false;
  let didDrag = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let resumeTimer;
  let previousTime = performance.now();

  const cycleWidth = () => firstSet.getBoundingClientRect().width + 15;
  const updateToggle = () => {
    toggle.innerHTML = `${icon(manuallyPaused ? 'play' : 'pause', 'icon')}<span>${manuallyPaused ? 'Play' : 'Pause'}</span>`;
    toggle.setAttribute('aria-label', `${manuallyPaused ? 'Play' : 'Pause'} featured menu carousel`);
    toggle.setAttribute('aria-pressed', String(manuallyPaused));
  };
  const pauseTemporarily = (delay = 2600) => {
    temporarilyPaused = true;
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => { temporarilyPaused = false; }, delay);
  };
  const moveByCard = (direction) => {
    const firstCard = firstSet.querySelector('.dish-card');
    const distance = (firstCard?.getBoundingClientRect().width || 280) + 15;
    if (direction < 0 && viewport.scrollLeft < distance) viewport.scrollLeft += cycleWidth();
    viewport.scrollBy({ left: direction * distance, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    pauseTemporarily();
  };

  updateToggle();
  toggle.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    temporarilyPaused = false;
    window.clearTimeout(resumeTimer);
    updateToggle();
  });
  dishCarousel.querySelector('[data-carousel-prev]').addEventListener('click', () => moveByCard(-1));
  dishCarousel.querySelector('[data-carousel-next]').addEventListener('click', () => moveByCard(1));
  viewport.addEventListener('pointerenter', () => { temporarilyPaused = true; window.clearTimeout(resumeTimer); });
  viewport.addEventListener('pointerleave', () => { temporarilyPaused = false; });
  viewport.addEventListener('focusin', () => { temporarilyPaused = true; window.clearTimeout(resumeTimer); });
  viewport.addEventListener('focusout', () => { temporarilyPaused = false; });
  viewport.addEventListener('touchstart', () => pauseTemporarily(3200), { passive: true });
  viewport.addEventListener('wheel', () => pauseTemporarily(), { passive: true });
  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    isDragging = true;
    didDrag = false;
    dragStartX = event.clientX;
    dragStartScroll = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
    pauseTemporarily();
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) > 4) didDrag = true;
    viewport.scrollLeft = dragStartScroll - distance;
  });
  const finishDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    pauseTemporarily();
  };
  viewport.addEventListener('pointerup', finishDrag);
  viewport.addEventListener('pointercancel', finishDrag);
  viewport.addEventListener('click', (event) => {
    if (!didDrag) return;
    event.preventDefault();
    event.stopPropagation();
    didDrag = false;
  }, true);

  const visibilityObserver = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0.05 });
  visibilityObserver.observe(dishCarousel);

  const animateCarousel = (time) => {
    const width = cycleWidth();
    if (width > 0 && viewport.scrollLeft >= width) viewport.scrollLeft -= width;
    if (!manuallyPaused && !temporarilyPaused && isVisible && !document.hidden) {
      viewport.scrollLeft += Math.min(time - previousTime, 40) * 0.034;
    }
    previousTime = time;
    requestAnimationFrame(animateCarousel);
  };
  requestAnimationFrame(animateCarousel);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('revealed'));
}
