(()=>{'use strict';
const tasks=window.GOODJOB_TASKS, $=s=>document.querySelector(s);
const names={'01':'研究缺口探索','02':'PICO 與研究問題','03':'多資料庫檢索策略','04':'搜尋歷程／PRISMA','05':'多篇文獻重點整理','06':'資料萃取與統計判讀','07':'方法學評讀與 VIP','08':'證據統整與臨床應用','09':'任務導向報告撰寫','10':'品質檢查','R00':'任務診斷與導航','C01':'案例報告與 CARE','Q01':'實證導向 QCC'};
let selected=tasks.find(t=>location.hash==='#task-'+t.code)||tasks[2],filter='全部';
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
$('#filters').innerHTML=['全部','報告','簡報','資訊圖表','通用'].map(f=>`<button data-filter="${f}" class="${filter===f?'active':''}" aria-pressed="${filter===f}">${f}</button>`).join('');
$('#taskGrid').innerHTML=tasks.filter(t=>filter==='全部'||t.out.includes(filter)).map(t=>`<button class="task-card ${selected.code===t.code?'selected':''}" data-task="${t.code}" aria-pressed="${selected.code===t.code}"><span class="task-no">${t.code}</span>${selected.code===t.code?'<span class="selected-mark">已選擇 ✓</span>':''}<span class="task-name">${t.name}</span><span class="task-meta">${t.out} · ${t.note}</span></button>`).join('');
const t=selected;
$('#taskDetail').innerHTML=`<div><div class="eyebrow">任務 ${t.code} · ${t.name}</div><h3>${t.name}<br>從這裡開始。</h3><p class="detail-copy">${t.need}</p><div class="resource-actions"><a class="btn btn-primary" href="${t.guide}" target="_blank" rel="noopener">HTML 使用說明 ↗</a><a class="btn btn-outline-dark" href="${t.deck}" target="_blank" rel="noopener">教學簡報 · ${t.slides} 頁 ↗</a>${t.notebook?`<a class="btn btn-outline-dark" href="${t.notebook}" target="_blank" rel="noopener noreferrer">開啟任務 Notebook ↗</a>`:'<button class="btn btn-outline-dark" disabled>Notebook 連結待補</button>'}</div><p class="resource-status">${t.notebook?'Notebook 來源配置與複製權限待確認；開啟後先檢查來源。':'第九個 Notebook 完整連結待補，使用說明與教學簡報可先使用。'}</p></div><div><div class="eyebrow detail-label">建議助手路線</div><p class="route-text">${t.route}</p><div class="assistant-chips">${t.agents.map(id=>`<div><small>${id}</small>${names[id]}</div>`).join('')}</div><p class="detail-copy small">助手依需求選用。每一步都需回查原始來源，經人工核對後再交接。</p>${t.code==='08'?'<p class="detail-copy small">同一筆記本內分流：案例用 C01；品質改善用 Q01。</p>':''}</div>`;
document.querySelectorAll('[data-task]').forEach(el=>el.onclick=()=>{selected=tasks.find(t=>t.code===el.dataset.task);history.replaceState(null,'','#task-'+selected.code);render();$('#taskDetail').scrollIntoView({behavior:'smooth',block:'start'});});
document.querySelectorAll('[data-filter]').forEach(el=>el.onclick=()=>{filter=el.dataset.filter;const visible=tasks.filter(t=>filter==='全部'||t.out.includes(filter));if(!visible.includes(selected))selected=visible[0];render();});
}
$('#menuBtn').onclick=()=>{const open=$('#mainNav').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',String(open));};
$('#mainNav').querySelectorAll('a').forEach(a=>a.onclick=()=>{$('#mainNav').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');});
window.addEventListener('hashchange',()=>{const t=tasks.find(t=>location.hash==='#task-'+t.code);if(t){selected=t;filter='全部';render();}});
render();
})();
