const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://www.vietnamworks.com/');

driver.findElement(By.name('keyword')).sendKeys('IT');
driver.findElement(By.className('button searchBar__button')).click();

driver.sleep(2000).then(function() {
    driver.getTitle().then(function(title) {
      if(title === 'Tuyển dụng, việc làm, tìm việc làm nhanh mới nhất | VietnamWorks') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
      //driver.quit();
    });
  });

// Conclude a test
//driver.quit();