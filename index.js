import{A as x,i as R}from"./assets/vendor-D3D60kz1.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function N(i,n="Завантаження..."){if(!i)return console.error("Loader Error: Не вказано батьківський елемент (parentElement)."),null;const t=document.createElement("div");return t.className="shared-loader",t.setAttribute("aria-live","polite"),t.setAttribute("aria-hidden","true"),t.innerHTML=`
    <span class="shared-loader-spinner"></span>
    <span class="shared-loader-text">${n}</span>
  `,i.appendChild(t),{show(){t.classList.add("is-visible"),t.setAttribute("aria-hidden","false")},hide(){t.classList.remove("is-visible"),t.setAttribute("aria-hidden","true")}}}(function(){const i="https://wedding-photographer.b.goit.study/api",n=`${i}/categories`,t=`${i}/wedding-photos`,l=9,e=3,o=document.getElementById("portfolioFilters"),d=document.getElementById("portfolioList"),m=document.getElementById("portfolioLoader"),f=document.getElementById("portfolioShowMore");let c={categoryId:"",loadedCount:0,totalItems:0,page:1};function g(){m.classList.add("is-visible"),m.setAttribute("aria-hidden","false")}function E(){m.classList.remove("is-visible"),m.setAttribute("aria-hidden","true")}function p(s){const a=`
      <li class="portfolio__filter-item" role="presentation">
        <button
          type="button"
          class="portfolio__filter-btn is-active"
          role="tab"
          aria-selected="true"
          data-category-id=""
        >All Photos</button>
      </li>
    `,u=s.map(r=>`
      <li class="portfolio__filter-item" role="presentation">
        <button
          type="button"
          class="portfolio__filter-btn"
          role="tab"
          aria-selected="false"
          data-category-id="${r._id}"
        >${r.category}</button>
      </li>
    `).join("");o.innerHTML=a+u}function y(s,{append:a}){const u=s.map(r=>`
      <li class="portfolio__item">
        <img
          class="portfolio__img"
          src="${r.img}"
          alt="${r.title}"
          loading="lazy"
        />
      </li>
    `).join("");a?d.insertAdjacentHTML("beforeend",u):d.innerHTML=u}function b(){c.loadedCount>=c.totalItems?f.classList.add("is-hidden"):(f.classList.remove("is-hidden"),f.disabled=!1)}function T({page:s,limit:a,categoryId:u}){const r=new URL(t);return r.searchParams.set("page",s),r.searchParams.set("limit",a),u&&r.searchParams.set("categoryId",u),r.toString()}async function $(){try{const s=await fetch(n);if(!s.ok)throw new Error(`Categories request failed: ${s.status}`);const a=await s.json();p(a)}catch(s){console.error(s),o.innerHTML='<li class="portfolio__filter-item">Не вдалося завантажити фільтри</li>'}}async function C({page:s,limit:a,categoryId:u,append:r}){g(),f.disabled=!0;try{const _=T({page:s,limit:a,categoryId:u}),P=await fetch(_);if(!P.ok)throw new Error(`Photos request failed: ${P.status}`);const L=await P.json();y(L.weddingPhotos,{append:r}),c.totalItems=L.totalItems,c.loadedCount=r?c.loadedCount+L.weddingPhotos.length:L.weddingPhotos.length,b()}catch(_){console.error(_),r||(d.innerHTML='<li class="portfolio__item portfolio__item--error">Не вдалося завантажити фото</li>')}finally{E()}}function O(s){c.categoryId=s,c.page=1,C({page:1,limit:l,categoryId:s,append:!1})}function q(){c.page+=1,C({page:c.page,limit:e,categoryId:c.categoryId,append:!0})}o.addEventListener("click",s=>{const a=s.target.closest(".portfolio__filter-btn");if(!a)return;o.querySelectorAll(".portfolio__filter-btn").forEach(r=>{r.classList.remove("is-active"),r.setAttribute("aria-selected","false")}),a.classList.add("is-active"),a.setAttribute("aria-selected","true");const u=a.dataset.categoryId||"";O(u)}),f.addEventListener("click",q),$(),O("")})();new x(".faq-list",{duration:400,showMultiple:!1,elementClass:"faq-item",triggerClass:"faq-btn",panelClass:"faq-content"});const M=document.getElementById("contacts-form"),v=document.getElementById("name"),I=document.getElementById("phone"),h=document.getElementById("message"),w=document.getElementById("submit-btn"),j=document.getElementById("success-modal"),B=N(M,"Sending...");function A(i,n,t=""){const l=i.closest(".form-group"),e=l.querySelector(".error-message");return i.value.trim()===""?(l.classList.remove("has-error"),e&&(e.textContent=""),!1):n?(l.classList.remove("has-error"),e&&(e.textContent=""),!0):(l.classList.add("has-error"),e&&(e.textContent=t),!1)}function S(){const i=v.value.trim(),n=I.value.trim(),t=h.value.trim(),l=/^[a-zA-Zа-яА-ЯіІєЄїЇґҐ\s]+$/,e=/^[0-9+\-\s()]+$/,o=l.test(i);let d="";i.length<=1?d="Name must be longer than 1 character":o||(d="Only letters and spaces allowed");const m=A(v,i.length>1&&o,d),f=e.test(n),c=n.replace(/\D/g,"");let g="";n.length===0?g="":(!f||c.length!==12)&&(g="Phone must contain exactly 12 digits");const E=A(I,f&&c.length===12,g);let p=!0;if(t.length>0&&t.length<=2)p=A(h,!1,"Message must be longer than 2 characters");else{const y=h.closest(".form-group"),b=y.querySelector(".error-message");y.classList.remove("has-error"),b&&(b.textContent=""),p=!0}i&&n&&m&&E&&p?w.disabled=!1:w.disabled=!0}v.addEventListener("input",S);I.addEventListener("input",S);h.addEventListener("input",S);M.addEventListener("submit",async i=>{i.preventDefault();const n={name:v.value.trim(),phone:I.value.trim().replace(/\D/g,""),message:h.value.trim()};try{w.disabled=!0,B.show();const t=await fetch("https://wedding-photographer.b.goit.study/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!t.ok){const e=await t.json();throw new Error(e.message||"Server error occurred")}const l=await t.json();console.log("Успіх:",l),j.classList.remove("is-hidden"),M.reset()}catch(t){R.error({title:"Error",message:t.message||"Something went wrong. Please try again.",position:"topRight"})}finally{B.hide(),w.disabled=!0}});
//# sourceMappingURL=index.js.map
