import{A as v}from"./assets/vendor-B9yFZyzz.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function g(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(e){if(e.ep)return;e.ep=!0;const i=g(e);fetch(e.href,i)}})();(function(){const p="https://wedding-photographer.b.goit.study/api",l=`${p}/categories`,g=`${p}/wedding-photos`,d=9,e=3,i=document.getElementById("portfolioFilters"),a=document.getElementById("portfolioList"),f=document.getElementById("portfolioLoader"),c=document.getElementById("portfolioShowMore");let n={categoryId:"",loadedCount:0,totalItems:0,page:1};function _(){f.classList.add("is-visible"),f.setAttribute("aria-hidden","false")}function b(){f.classList.remove("is-visible"),f.setAttribute("aria-hidden","true")}function I(t){const r=`
      <li class="portfolio__filter-item" role="presentation">
        <button
          type="button"
          class="portfolio__filter-btn is-active"
          role="tab"
          aria-selected="true"
          data-category-id=""
        >All Photos</button>
      </li>
    `,s=t.map(o=>`
      <li class="portfolio__filter-item" role="presentation">
        <button
          type="button"
          class="portfolio__filter-btn"
          role="tab"
          aria-selected="false"
          data-category-id="${o._id}"
        >${o.category}</button>
      </li>
    `).join("");i.innerHTML=r+s}function w(t,{append:r}){const s=t.map(o=>`
      <li class="portfolio__item">
        <img
          class="portfolio__img"
          src="${o.img}"
          alt="${o.title}"
          loading="lazy"
        />
      </li>
    `).join("");r?a.insertAdjacentHTML("beforeend",s):a.innerHTML=s}function E(){n.loadedCount>=n.totalItems?c.classList.add("is-hidden"):(c.classList.remove("is-hidden"),c.disabled=!1)}function P({page:t,limit:r,categoryId:s}){const o=new URL(g);return o.searchParams.set("page",t),o.searchParams.set("limit",r),s&&o.searchParams.set("categoryId",s),o.toString()}async function A(){try{const t=await fetch(l);if(!t.ok)throw new Error(`Categories request failed: ${t.status}`);const r=await t.json();I(r)}catch(t){console.error(t),i.innerHTML='<li class="portfolio__filter-item">Не вдалося завантажити фільтри</li>'}}async function y({page:t,limit:r,categoryId:s,append:o}){_(),c.disabled=!0;try{const m=P({page:t,limit:r,categoryId:s}),h=await fetch(m);if(!h.ok)throw new Error(`Photos request failed: ${h.status}`);const u=await h.json();w(u.weddingPhotos,{append:o}),n.totalItems=u.totalItems,n.loadedCount=o?n.loadedCount+u.weddingPhotos.length:u.weddingPhotos.length,E()}catch(m){console.error(m),o||(a.innerHTML='<li class="portfolio__item portfolio__item--error">Не вдалося завантажити фото</li>')}finally{b()}}function L(t){n.categoryId=t,n.page=1,y({page:1,limit:d,categoryId:t,append:!1})}function M(){n.page+=1,y({page:n.page,limit:e,categoryId:n.categoryId,append:!0})}i.addEventListener("click",t=>{const r=t.target.closest(".portfolio__filter-btn");if(!r)return;i.querySelectorAll(".portfolio__filter-btn").forEach(o=>{o.classList.remove("is-active"),o.setAttribute("aria-selected","false")}),r.classList.add("is-active"),r.setAttribute("aria-selected","true");const s=r.dataset.categoryId||"";L(s)}),c.addEventListener("click",M),A(),L("")})();new v(".faq-list",{duration:400,showMultiple:!1,elementClass:"faq-item",triggerClass:"faq-btn",panelClass:"faq-content"});
//# sourceMappingURL=index.js.map
