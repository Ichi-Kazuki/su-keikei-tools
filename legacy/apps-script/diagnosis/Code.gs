/** 創価大学 経済経営学部 オープンキャンパス用「未来をデザインする3分診断」 */

const APP_TITLE = '経済経営学部 未来をデザインする3分診断';

function doGet() {
  const template = HtmlService.createTemplateFromFile('Index');
  template.appTitle = APP_TITLE;

  return template
    .evaluate()
    .setTitle(APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
