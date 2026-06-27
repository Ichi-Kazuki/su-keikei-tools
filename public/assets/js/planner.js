'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initPlanner().catch(showLoadError);
});

async function initPlanner() {
  const [metadata, courses] = await Promise.all([
        fetchJson("/data/modules.json"),
        fetchJson("/data/courses.json"),
      ]);
      const bootstrap = { ...metadata, courses };
      const moduleOrder = bootstrap.modules.map((module) => module.code);
      const moduleMap = new Map(bootstrap.modules.map((module) => [module.code, module.name]));
      const collator = new Intl.Collator("ja");
      const initialCompletedNames = new Set(
        bootstrap.courses.filter((course) => course.completed).map((course) => course.name)
      );
  
      const state = {
        modules: new Set(bootstrap.defaults.modules),
        semester: bootstrap.defaults.semester,
        year: bootstrap.defaults.year,
        completedNames: new Set(initialCompletedNames),
        completedSearch: "",
      };
  
      let lastPlan = null;
  
      const elements = {};
  
      function init() {
        cacheElements();
        renderModules();
        renderCompletedList();
        renderFacultyInfo();
        bindEvents();
        syncControls();
        updatePlan();
      }
  
      function cacheElements() {
        elements.moduleList = document.getElementById("moduleList");
        elements.toggleAllModules = document.getElementById("toggleAllModules");
        elements.completedList = document.getElementById("completedList");
        elements.completedSearch = document.getElementById("completedSearch");
        elements.clearCompleted = document.getElementById("clearCompleted");
        elements.resetButton = document.getElementById("resetButton");
        elements.copyButton = document.getElementById("copyButton");
        elements.printButton = document.getElementById("printButton");
        elements.scheduleTable = document.getElementById("scheduleTable");
        elements.summaryGrid = document.getElementById("summaryGrid");
        elements.resultBody = document.getElementById("resultBody");
        elements.alertList = document.getElementById("alertList");
        elements.totalCredits = document.getElementById("totalCredits");
        elements.headerTotal = document.getElementById("headerTotal");
        elements.headerCourses = document.getElementById("headerCourses");
        elements.slotCount = document.getElementById("slotCount");
        elements.conflictCount = document.getElementById("conflictCount");
        elements.dataSource = document.getElementById("dataSource");
        elements.facultyInfo = document.getElementById("facultyInfo");
      }
  
      function bindEvents() {
        elements.moduleList.addEventListener("change", (event) => {
          const checkbox = event.target.closest("input[type='checkbox']");
          if (!checkbox) return;
  
          if (checkbox.checked) {
            state.modules.add(checkbox.value);
          } else {
            state.modules.delete(checkbox.value);
          }
  
          updatePlan();
          updateModuleToggleText();
        });
  
        elements.toggleAllModules.addEventListener("click", () => {
          if (state.modules.size === bootstrap.modules.length) {
            state.modules.clear();
          } else {
            state.modules = new Set(moduleOrder);
          }
          syncControls();
          updatePlan();
        });
  
        document.querySelectorAll("input[name='semester']").forEach((input) => {
          input.addEventListener("change", () => {
            state.semester = input.value;
            updatePlan();
          });
        });
  
        document.querySelectorAll("input[name='year']").forEach((input) => {
          input.addEventListener("change", () => {
            state.year = Number(input.value);
            updatePlan();
          });
        });
  
        elements.completedSearch.addEventListener("input", () => {
          state.completedSearch = elements.completedSearch.value.trim();
          renderCompletedList();
        });
  
        elements.completedList.addEventListener("change", (event) => {
          const checkbox = event.target.closest("input[type='checkbox']");
          if (!checkbox) return;
  
          const name = checkbox.dataset.name;
          if (checkbox.checked) {
            state.completedNames.add(name);
          } else {
            state.completedNames.delete(name);
          }
          updatePlan();
        });
  
        elements.clearCompleted.addEventListener("click", () => {
          state.completedNames.clear();
          renderCompletedList();
          updatePlan();
        });
  
        elements.resetButton.addEventListener("click", () => {
          state.modules = new Set(bootstrap.defaults.modules);
          state.semester = bootstrap.defaults.semester;
          state.year = bootstrap.defaults.year;
          state.completedNames = new Set(initialCompletedNames);
          state.completedSearch = "";
          elements.completedSearch.value = "";
          syncControls();
          renderCompletedList();
          updatePlan();
        });
  
        elements.copyButton.addEventListener("click", copyPlan);
        elements.printButton.addEventListener("click", () => window.print());
  
        document.querySelectorAll(".tab-button").forEach((button) => {
          button.addEventListener("click", () => activateTab(button.dataset.tab));
        });
      }
  
      function renderModules() {
        elements.moduleList.innerHTML = bootstrap.modules
          .map(
            (module) => `
              <label class="check-row">
                <input type="checkbox" value="${escapeAttr(module.code)}">
                <span>
                  <span class="module-name">${escapeHtml(module.name)}</span>
                  <span class="module-code">${escapeHtml(module.code)}</span>
                </span>
              </label>
            `
          )
          .join("");
      }
  
      function renderCompletedList() {
        const items = buildCompletedItems();
        const search = state.completedSearch.toLowerCase();
        const filtered = search
          ? items.filter((item) => item.searchText.includes(search))
          : items;
  
        elements.completedList.innerHTML = filtered.length
          ? filtered
              .map((item) => {
                const checked = state.completedNames.has(item.name) ? "checked" : "";
                return `
                  <label class="completed-item">
                    <input type="checkbox" data-name="${escapeAttr(item.name)}" ${checked}>
                    <span>
                      <span class="completed-name">${escapeHtml(item.name)}</span>
                      <span class="completed-meta">${escapeHtml(item.meta)}</span>
                    </span>
                  </label>
                `;
              })
              .join("")
          : `<div class="completed-item"><span></span><span class="completed-name">該当科目なし</span></div>`;
      }
  
      function renderFacultyInfo() {
        const info = bootstrap.facultyInfo;
        const basicRows = info.basics
          .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
          .join("");
  
        elements.facultyInfo.innerHTML = `
          <article class="faculty-card wide">
            <h2>${escapeHtml(info.title)}</h2>
            <dl class="fact-list">${basicRows}</dl>
          </article>
          <article class="faculty-card wide">
            <h2>理念</h2>
            <p>${escapeHtml(info.philosophy)}</p>
          </article>
          ${listCard("教育目標", info.goals)}
          ${listCard("学びの特徴", info.features)}
          ${listCard("3つの学修コース", info.courses)}
          ${listCard("卒業要件の要点", info.graduation)}
          ${listCard("出典", info.sources, "wide")}
        `;
      }
  
      function listCard(title, items, extraClass = "") {
        return `
          <article class="faculty-card ${extraClass}">
            <h2>${escapeHtml(title)}</h2>
            <ul>
              ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>
        `;
      }
  
      function syncControls() {
        elements.moduleList.querySelectorAll("input[type='checkbox']").forEach((input) => {
          input.checked = state.modules.has(input.value);
        });
        document.querySelectorAll("input[name='semester']").forEach((input) => {
          input.checked = input.value === state.semester;
        });
        document.querySelectorAll("input[name='year']").forEach((input) => {
          input.checked = Number(input.value) === state.year;
        });
        updateModuleToggleText();
      }
  
      function updatePlan() {
        lastPlan = calculatePlan();
        renderStatus(lastPlan);
        renderAlerts(lastPlan);
        renderSchedule(lastPlan);
        renderSummary(lastPlan);
        renderResults(lastPlan);
      }
  
      function calculatePlan() {
        const rows = bootstrap.courses.filter((course) => {
          const yearMatches = course.year === state.year || (state.year === 3 && course.year === 2);
          return (
            state.modules.has(course.module) &&
            course.semester === state.semester &&
            yearMatches &&
            !course.completed &&
            !state.completedNames.has(course.name)
          );
        });
  
        const uniqueMap = new Map();
        const countedKeys = new Set();
        const schedule = createEmptySchedule();
        const summaryMap = new Map(
          bootstrap.modules.map((module) => [
            module.code,
            { code: module.code, name: module.name, credits: 0, courses: [] },
          ])
        );
  
        rows.forEach((course) => {
          const key = courseKey(course);
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, {
              key,
              name: course.name,
              module: course.module,
              moduleName: moduleMap.get(course.module) || course.module,
              semester: course.semester,
              year: course.year,
              credits: Number(course.credits || 0),
              slots: [],
              note: course.note || "",
            });
          }
  
          uniqueMap.get(key).slots.push(`${course.day}${course.period}限`);
  
          if (Number(course.credits || 0) > 0 && !countedKeys.has(key)) {
            countedKeys.add(key);
            const summary = summaryMap.get(course.module);
            summary.credits += Number(course.credits || 0);
            summary.courses.push(course.name);
          }
  
          if (schedule[course.day] && schedule[course.day][course.period]) {
            schedule[course.day][course.period].push({
              id: course.id,
              name: course.name,
              module: course.module,
              moduleName: moduleMap.get(course.module) || course.module,
              credits: Number(course.credits || 0),
            });
          }
        });
  
        const resultRows = Array.from(uniqueMap.values()).sort((a, b) => {
          const moduleDiff = moduleOrder.indexOf(a.module) - moduleOrder.indexOf(b.module);
          if (moduleDiff !== 0) return moduleDiff;
          return collator.compare(a.name, b.name);
        });
  
        const summaries = bootstrap.modules.map((module) => summaryMap.get(module.code));
        const totalCredits = summaries.reduce((sum, item) => sum + item.credits, 0);
        const conflicts = collectConflicts(schedule);
  
        return {
          rows,
          resultRows,
          summaries,
          schedule,
          totalCredits,
          conflicts,
        };
      }
  
      function createEmptySchedule() {
        return bootstrap.days.reduce((schedule, day) => {
          schedule[day] = bootstrap.periods.reduce((periodMap, period) => {
            periodMap[period] = [];
            return periodMap;
          }, {});
          return schedule;
        }, {});
      }
  
      function collectConflicts(schedule) {
        const conflicts = [];
        bootstrap.days.forEach((day) => {
          bootstrap.periods.forEach((period) => {
            const courses = schedule[day][period];
            if (courses.length > 1) {
              conflicts.push({ day, period, courses });
            }
          });
        });
        return conflicts;
      }
  
      function renderStatus(plan) {
        elements.totalCredits.textContent = plan.totalCredits;
        elements.headerTotal.textContent = plan.totalCredits;
        elements.headerCourses.textContent = plan.resultRows.length;
        elements.slotCount.textContent = plan.rows.length;
        elements.conflictCount.textContent = plan.conflicts.length;
        elements.dataSource.textContent = bootstrap.dataSource;
      }
  
      function renderAlerts(plan) {
        elements.alertList.innerHTML = plan.conflicts
          .map((conflict) => {
            const names = conflict.courses.map((course) => course.name).join(" / ");
            return `<div class="alert">${escapeHtml(conflict.day)}曜${escapeHtml(conflict.period)}限: ${escapeHtml(names)}</div>`;
          })
          .join("");
      }
  
      function renderSchedule(plan) {
        const head = `
          <thead>
            <tr>
              <th>時限</th>
              ${bootstrap.days.map((day) => `<th>${escapeHtml(day)}</th>`).join("")}
            </tr>
          </thead>
        `;
        const body = bootstrap.periods
          .map((period) => {
            const cells = bootstrap.days
              .map((day) => {
                const courses = plan.schedule[day][period];
                const className = courses.length > 1 ? "schedule-cell conflict" : "schedule-cell";
                const content = courses.length
                  ? courses.map(renderCoursePill).join("")
                  : `<span class="empty-cell">-</span>`;
                return `<td class="${className}">${content}</td>`;
              })
              .join("");
            return `<tr><td>${period}限</td>${cells}</tr>`;
          })
          .join("");
  
        elements.scheduleTable.innerHTML = `${head}<tbody>${body}</tbody>`;
      }
  
      function renderCoursePill(course) {
        return `
          <span class="course-pill">
            <span class="module-badge">${escapeHtml(course.module)}</span>${escapeHtml(course.name)}
          </span>
        `;
      }
  
      function renderSummary(plan) {
        elements.summaryGrid.innerHTML = plan.summaries
          .map((summary) => {
            const courses = summary.courses.length
              ? summary.courses.join("、")
              : "対象なし";
            return `
              <article class="summary-item">
                <div class="summary-title">
                  <span>${escapeHtml(summary.code)} ${escapeHtml(summary.name)}</span>
                  <strong>${summary.credits}</strong>
                </div>
                <div class="summary-courses">${escapeHtml(courses)}</div>
              </article>
            `;
          })
          .join("");
      }
  
      function renderResults(plan) {
        elements.resultBody.innerHTML = plan.resultRows.length
          ? plan.resultRows
              .map(
                (course) => `
                  <tr>
                    <td><span class="course-slot">${escapeHtml(course.module)}</span></td>
                    <td>${escapeHtml(course.name)}</td>
                    <td>${course.year}年次</td>
                    <td>${escapeHtml(course.semester)}</td>
                    <td>${escapeHtml(course.slots.join(" / "))}</td>
                    <td>${course.credits}</td>
                  </tr>
                `
              )
              .join("")
          : `<tr><td colspan="6">該当科目なし</td></tr>`;
      }
  
      function buildCompletedItems() {
        const map = new Map();
        bootstrap.courses.forEach((course) => {
          if (!map.has(course.name)) {
            map.set(course.name, {
              name: course.name,
              modules: new Set(),
              years: new Set(),
              semesters: new Set(),
            });
          }
          const item = map.get(course.name);
          item.modules.add(course.module);
          item.years.add(course.year);
          item.semesters.add(course.semester);
        });
  
        return Array.from(map.values())
          .map((item) => {
            const modules = Array.from(item.modules).sort(
              (a, b) => moduleOrder.indexOf(a) - moduleOrder.indexOf(b)
            );
            const years = Array.from(item.years).sort((a, b) => a - b).map((year) => `${year}年`);
            const semesters = Array.from(item.semesters).sort((a, b) => (a === "春" ? -1 : 1));
            const meta = `${modules.join("/")} ${years.join("/")} ${semesters.join("/")}`;
            return {
              ...item,
              meta,
              firstModule: modules[0],
              searchText: `${item.name} ${meta}`.toLowerCase(),
            };
          })
          .sort((a, b) => {
            const moduleDiff =
              moduleOrder.indexOf(a.firstModule) - moduleOrder.indexOf(b.firstModule);
            if (moduleDiff !== 0) return moduleDiff;
            return collator.compare(a.name, b.name);
          });
      }
  
      function updateModuleToggleText() {
        elements.toggleAllModules.textContent =
          state.modules.size === bootstrap.modules.length ? "すべて解除" : "すべて選択";
      }
  
      function activateTab(tabName) {
        document.querySelectorAll(".tab-button").forEach((button) => {
          button.classList.toggle("active", button.dataset.tab === tabName);
        });
        document.getElementById("planPanel").classList.toggle("hidden", tabName !== "plan");
        document.getElementById("facultyPanel").classList.toggle("hidden", tabName !== "faculty");
      }
  
      async function copyPlan() {
        if (!lastPlan) return;
  
        const text = buildCopyText(lastPlan);
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            fallbackCopy(text);
          }
          flashButton(elements.copyButton, "コピー済み");
        } catch (error) {
          fallbackCopy(text);
          flashButton(elements.copyButton, "コピー済み");
        }
      }
  
      function buildCopyText(plan) {
        const conditions = [
          `モジュール: ${Array.from(state.modules).join(", ") || "未選択"}`,
          `学期: ${state.semester}`,
          `年次: ${state.year}年次`,
          `総単位数: ${plan.totalCredits}`,
        ];
        const rows = plan.resultRows.map(
          (course) =>
            `${course.module}\t${course.name}\t${course.year}年次\t${course.semester}\t${course.slots.join(" / ")}\t${course.credits}`
        );
        return [
          "履修モジュールプランナー",
          conditions.join("\n"),
          "",
          "モジュール\t科目名\t年次\t学期\t開講枠\t単位",
          ...rows,
        ].join("\n");
      }
  
      function fallbackCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
  
      function flashButton(button, label) {
        const original = button.textContent;
        button.textContent = label;
        window.setTimeout(() => {
          button.textContent = original;
        }, 1300);
      }
  
      function courseKey(course) {
        return [course.module, course.name, course.semester, course.year].join("|");
      }
  
      function escapeHtml(value) {
        return String(value ?? "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      }
  
      function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, "&#96;");
      }
  
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
      } else {
        init();
      }
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(path + ' を読み込めませんでした');
  return response.json();
}

function showLoadError(error) {
  const target = document.querySelector('.workspace') || document.body;
  target.textContent = 'データの読み込みに失敗しました。公開設定またはファイル配置を確認してください。';
  console.error(error);
}
