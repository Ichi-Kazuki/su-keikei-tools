'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initDiagnosis().catch(showLoadError);
});

async function initDiagnosis() {
  const diagnosisData = await fetchJson('/data/questions.json');
  const themes = diagnosisData.themes;
  const questions = diagnosisData.questions;
  'use strict';
  
      const state = { current: 0, answers: {}, resultIds: [] };
      const byId = function (id) { return document.getElementById(id); };
      const screens = ['welcome-screen', 'quiz-screen', 'result-screen'];
  
      function showOnly(screenId) {
        screens.forEach(function (id) { byId(id).classList.toggle('hidden', id !== screenId); });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  
      function startQuiz() {
        state.current = 0;
        state.answers = {};
        state.resultIds = [];
        showOnly('quiz-screen');
        renderQuestion();
      }
  
      function renderQuestion() {
        const question = questions[state.current];
        const answered = state.answers[question.id] || [];
        byId('progress-text').textContent = 'QUESTION ' + (state.current + 1) + ' / ' + questions.length;
        byId('progress-percent').textContent = Math.round(((state.current + 1) / questions.length) * 100) + '%';
        byId('progress-bar').style.width = ((state.current + 1) / questions.length) * 100 + '%';
        byId('back-button').style.visibility = state.current === 0 ? 'hidden' : 'visible';
        byId('next-button').textContent = state.current === questions.length - 1 ? '結果を見る →' : '次へ →';
  
        const choices = question.choices.map(function (choice) {
          const ids = choice[0].split(',');
          const selected = question.type === 'multi'
            ? ids.some(function (id) { return answered.indexOf(id) > -1; })
            : answered.join(',') === choice[0];
          return '<button class="choice" type="button" data-value="' + choice[0] + '" aria-pressed="' + selected + '"><strong>' + choice[1] + '</strong><small>' + choice[2] + '</small></button>';
        }).join('');
  
        byId('question-card').innerHTML =
          '<div class="question-number">0' + (state.current + 1) + '</div>' +
          '<h2>' + question.title + '</h2>' +
          '<p class="question-helper">' + question.helper + '</p>' +
          '<div class="choice-list">' + choices + '</div>' +
          '<p id="selection-hint" class="selection-hint"></p>';
  
        document.querySelectorAll('.choice').forEach(function (button) {
          button.addEventListener('click', function () { selectChoice(question, button.dataset.value); });
        });
      }
  
      function selectChoice(question, value) {
        if (question.type === 'single') {
          state.answers[question.id] = value.split(',');
        } else {
          const selected = state.answers[question.id] || [];
          const optionIds = value.split(',');
          const isSelected = optionIds.some(function (id) { return selected.indexOf(id) > -1; });
          if (isSelected) {
            state.answers[question.id] = selected.filter(function (id) { return optionIds.indexOf(id) === -1; });
          } else if (selected.length >= question.max) {
            byId('selection-hint').textContent = '最大' + question.max + 'つまで選べます。選択を外してから選び直してください。';
            return;
          } else {
            state.answers[question.id] = selected.concat(optionIds);
          }
        }
        renderQuestion();
      }
  
      function nextQuestion() {
        const question = questions[state.current];
        const selection = state.answers[question.id] || [];
        if (!selection.length) {
          byId('selection-hint').textContent = '1つ以上選んでください。';
          return;
        }
        if (state.current < questions.length - 1) {
          state.current += 1;
          renderQuestion();
        } else {
          showResult();
        }
      }
  
      function getRankedThemes() {
        const score = {};
        Object.keys(themes).forEach(function (id) { score[id] = 0; });
        questions.forEach(function (question) {
          (state.answers[question.id] || []).forEach(function (id) { score[id] += question.id === 'interest' ? 3 : 1; });
        });
        const interestOrder = state.answers.interest || [];
        return Object.keys(score).sort(function (a, b) {
          if (score[b] !== score[a]) return score[b] - score[a];
          const aInterest = interestOrder.indexOf(a);
          const bInterest = interestOrder.indexOf(b);
          if (aInterest !== bInterest) return (aInterest === -1 ? 99 : aInterest) - (bInterest === -1 ? 99 : bInterest);
          return a.localeCompare(b, 'ja');
        });
      }
  
      function makeCard(id, isPrimary) {
        const theme = themes[id];
        return '<article class="result-card ' + (isPrimary ? 'primary' : '') + '">' +
          '<span class="tag">' + (isPrimary ? 'あなたのメインテーマ' : 'もう一つの可能性') + '</span>' +
          '<h3>' + theme.label + '</h3>' +
          '<p><strong>' + theme.route + '</strong></p>' +
          '<p>' + theme.lead + '</p>' +
          '<ul>' + theme.points.map(function (point) { return '<li>' + point + '</li>'; }).join('') + '</ul>' +
          '</article>';
      }
  
      function showResult() {
        state.resultIds = getRankedThemes().slice(0, 2);
        const primary = themes[state.resultIds[0]];
        byId('result-title').textContent = '「' + primary.shortLabel + '」から、未来をひらく。';
        byId('result-lead').textContent = primary.lead + ' そして、' + themes[state.resultIds[1]].shortLabel + 'の視点を組み合わせると、あなただけの学び方がさらに広がります。';
        byId('result-cards').innerHTML = makeCard(state.resultIds[0], true) + makeCard(state.resultIds[1], false);
        showOnly('result-screen');
      }
  
      byId('start-button').addEventListener('click', startQuiz);
      byId('brand-home').addEventListener('click', function (event) {
        event.preventDefault();
        showOnly('welcome-screen');
      });
      byId('next-button').addEventListener('click', nextQuestion);
      byId('back-button').addEventListener('click', function () { state.current -= 1; renderQuestion(); });
      byId('restart-button').addEventListener('click', startQuiz);
      byId('print-button').addEventListener('click', function () { window.print(); });
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(path + ' を読み込めませんでした');
  return response.json();
}

function showLoadError(error) {
  const target = document.getElementById('question-card') || document.body;
  target.textContent = 'データの読み込みに失敗しました。公開設定またはファイル配置を確認してください。';
  console.error(error);
}
