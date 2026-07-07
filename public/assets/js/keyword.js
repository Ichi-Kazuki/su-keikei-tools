'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initKeyword().catch(showLoadError);
});

async function initKeyword() {
  const appData = await fetchJson('/data/keyword.json');
  const selected = new Set();
      const keywordGroups = document.getElementById('keywordGroups');
      const count = document.getElementById('count');
      const selectedList = document.getElementById('selectedList');
      const results = document.getElementById('results');
      const resetButton = document.getElementById('resetButton');
      const printButton = document.getElementById('printButton');
      const shareButton = document.getElementById('shareButton');
      const commonMessage = document.getElementById('commonMessage');
  
      commonMessage.textContent = appData.commonMessage;
  
      initFromUrl();
      renderKeywords();
      renderState();
  
      resetButton.addEventListener('click', () => {
        selected.clear();
        updateUrl();
        renderState();
      });
  
      printButton.addEventListener('click', () => window.print());
  
      shareButton.addEventListener('click', async () => {
        const url = buildResultUrl();
        try {
          await navigator.clipboard.writeText(url);
          shareButton.textContent = 'コピー済み';
          setTimeout(() => shareButton.textContent = '結果URL', 1400);
        } catch (error) {
          prompt('このURLをコピーしてください', url);
        }
      });
  
      function renderKeywords() {
        keywordGroups.innerHTML = `
          <div class="chips" aria-label="キーワード一覧">
            ${appData.keywords.map((item, index) => keywordButton({ ...item, index })).join('')}
          </div>
        `;
  
        keywordGroups.querySelectorAll('.chip').forEach(button => {
          button.addEventListener('click', () => toggleKeyword(Number(button.dataset.index)));
        });
      }
  
      function keywordButton(item) {
        const description = [item.category, item.description].filter(Boolean).join(' / ');
        return `
          <button type="button" class="chip" data-index="${item.index}" title="${escapeAttr(description)}" aria-label="${escapeAttr(item.keyword)}を選択">
            <span class="chip-name">#${escapeHtml(item.keyword)}</span>
          </button>
        `;
      }
  
      function toggleKeyword(index) {
        if (selected.has(index)) {
          selected.delete(index);
        } else if (selected.size < appData.selectionLimit) {
          selected.add(index);
        }
        updateUrl();
        renderState();
      }
  
      function renderState() {
        count.textContent = `${selected.size}/${appData.selectionLimit}`;
        const selectedItems = getSelectedItems();
        selectedList.innerHTML = selectedItems.map(item => `
          <span class="selected-pill">#${escapeHtml(item.keyword)}</span>
        `).join('');
  
        document.querySelectorAll('.chip').forEach(button => {
          const index = Number(button.dataset.index);
          const isSelected = selected.has(index);
          const isDisabled = !isSelected && selected.size >= appData.selectionLimit;
          button.classList.toggle('is-selected', isSelected);
          button.classList.toggle('is-disabled', isDisabled);
          button.setAttribute('aria-pressed', String(isSelected));
        });
  
        printButton.disabled = selected.size === 0;
        shareButton.disabled = selected.size === 0;
        renderResults(selectedItems);
      }
  
      function renderResults(selectedItems) {
        if (!selectedItems.length) {
          results.className = 'empty';
          results.innerHTML = 'キーワードを選ぶと、ここに結果が表示されます。';
          return;
        }
  
        const scored = scoreAreas(selectedItems);
        results.className = 'result-list';
        results.innerHTML = scored.map((entry, index) => resultCard(entry, index)).join('');
      }
  
      function scoreAreas(selectedItems) {
        const scores = {};
        selectedItems.forEach(item => {
          Object.entries(item.weights || {}).forEach(([code, value]) => {
            scores[code] = (scores[code] || 0) + Number(value || 0);
          });
        });
  
        const max = Math.max(1, ...Object.values(scores));
        return appData.areas
          .map(area => ({
            area,
            score: scores[area.areaCode] || 0,
            match: Math.round(((scores[area.areaCode] || 0) / max) * 100),
            lessons: appData.lessons.filter(lesson => lesson.areaCode === area.areaCode).slice(0, 3),
          }))
          .filter(entry => entry.score > 0)
          .sort((a, b) => b.score - a.score || a.area.name.localeCompare(b.area.name, 'ja'))
          .slice(0, 3);
      }
  
      function resultCard(entry, index) {
        const area = entry.area;
        const style = `style="--accent: ${escapeCssToken(area.color || '#334155')}"`;
        return `
          <article class="result-card" ${style}>
            <div class="result-top">
              <div class="result-title-row">
                <span class="rank">${index + 1}</span>
                <div>
                  <h3 class="area-name"><span class="module-prefix">モジュール：</span>${escapeHtml(area.name)}</h3>
                  <p class="subtitle">${escapeHtml(area.subtitle || '')}</p>
                </div>
              </div>
              <span class="match">マッチ度 ${entry.match}%</span>
            </div>
            <p class="description">${escapeHtml(area.description || '')}</p>
            <div class="question">
              <span>関連する問い</span>
              <p>${escapeHtml(area.question || '')}</p>
            </div>
            <div class="meta">
              <div class="meta-row">
                <strong>近い学びの領域</strong>
                <span>${escapeHtml(area.course || '')}</span>
              </div>
              <div class="meta-row">
                <strong>授業例</strong>
                <ul class="lesson-list">
                  ${entry.lessons.map(lesson => `
                    <li>
                      <span class="lesson-name">${escapeHtml(lesson.name)}</span>
                      <span class="lesson-detail">${escapeHtml([lesson.year, lesson.term, lesson.description].filter(Boolean).join(' / '))}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="meta-row">
                <strong>相談で聞くとよいこと</strong>
                <span>${escapeHtml(area.advice || '')}</span>
              </div>
            </div>
          </article>
        `;
      }
  
      function getSelectedItems() {
        return Array.from(selected).map(index => appData.keywords[index]).filter(Boolean);
      }
  
      function initFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const raw = params.get('k');
        if (!raw) return;
        raw.split(',').map(Number).forEach(index => {
          if (Number.isInteger(index) && appData.keywords[index] && selected.size < appData.selectionLimit) {
            selected.add(index);
          }
        });
      }
  
      function updateUrl() {
        const url = buildResultUrl();
        if (history.replaceState) history.replaceState(null, '', url);
      }
  
      function buildResultUrl() {
        const url = new URL(window.location.href);
        const values = Array.from(selected).sort((a, b) => a - b);
        if (values.length) {
          url.searchParams.set('k', values.join(','));
        } else {
          url.searchParams.delete('k');
        }
        return url.toString();
      }
  
      function escapeHtml(value) {
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
  
      function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, '&#096;');
      }

      function escapeCssToken(value) {
        return String(value).replace(/[^#(),.% a-zA-Z0-9-]/g, '');
      }
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(path + ' を読み込めませんでした');
  return response.json();
}

function showLoadError(error) {
  const target = document.getElementById('results') || document.body;
  target.textContent = 'データの読み込みに失敗しました。公開設定またはファイル配置を確認してください。';
  console.error(error);
}
