async function runtest_byKeyword(testcase) {
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .build();

await driver.get('https://www.vietnamworks.com/');
  
await driver.findElement(By.name('keyword')).sendKeys(testcase);
await driver.findElement(By.className('button searchBar__button')).click();
let isExistJob
const elements = await driver.findElements(By.className('block-job-list'))
if(elements.length === 1) isExistJob = true
else isExistJob = false
await driver.quit();
return isExistJob
}

async function runtest_byFilter(testcase, i) {
  const webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;
  
  const driver = await new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  
  await driver.get('https://www.vietnamworks.com/job-search/all-jobs?filtered=true');
    
  //await driver.findElement(By.className('active-text text-default')).click();
  let listOfElements = await driver.findElements(By.className('active-text text-default'));
  switch (i) {
    case 1:
      await listOfElements[0].click()
      break;
    case 5:
      await listOfElements[1].click()
      break;
  }

  //await driver.findElement(By.className('input')).sendKeys(testcase);

  let listOfElements_input = await driver.findElements(By.className('input'));
  switch (i) {
    case 1:
      await listOfElements_input[0].sendKeys(testcase)
      break;
    case 5:
      await listOfElements_input[1].sendKeys(testcase)
      break;
  }

  await driver.findElement(By.className('sc-fzoXWK hnKkAN btn-search')).click();

  let isExistJob
  const elements = await driver.findElements(By.className('block-job-list'))
  if(elements.length === 1) isExistJob = true
  else isExistJob = false
  await driver.quit();
  return isExistJob
  }

async function runtest_timequery() {
  const webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

  const driver = await new webdriver.Builder()
      .forBrowser('chrome')
      .build();

  await driver.get('https://www.vietnamworks.com/');
    
  await driver.findElement(By.name('keyword')).sendKeys('');
  await driver.findElement(By.className('button searchBar__button')).click();
  var start = new Date().getTime();
  let isExistJob
  const elements = await driver.findElements(By.className('block-job-list'))
  if(elements.length === 1) isExistJob = true
  else isExistJob = false
  var end = new Date().getTime();
  await driver.quit();
  var time = end - start;
  console.log("Call to doSomething took " + time + " milliseconds.")
  return time
}

async function main() {
  let fs = require('fs');
  const delay = require('delay')
  let data = fs.readFileSync('input.txt', 'utf8')
  // split the contents by new line
  const lines = data.split(/\r?\n/);

  let testcase = []
  // print all lines
  lines.forEach((line) => {
    testcase.push(line)
  });

  let result = []
  for (let i=0;i<testcase.length;i++){
    let data
    if (i==1 || i==5) {
      data = await runtest_byFilter(testcase[i].toString(),i)
    }
    else if(i==9) {
      data = await runtest_timequery()
    }
    else {
      data = await runtest_byKeyword(testcase[i].toString())
    }
    if(i!=9) {
    if (data == true) {
      data = 'Tim thay viec lam phu hop'
    }
    else data = 'Khong tim thay viec lam phu hop'
  }
    console.log(data)
    result.push(data)
  }
  console.log(result)

  let output = fs.readFileSync('output.txt', 'utf8')
  // split the contents by new line
  const lines_ = output.split(/\r?\n/);

  let outputs = []
  // print all lines
  lines_.forEach((line) => {
    outputs.push(line)
  });

  //console.log(outputs)
  fs.writeFile('result.txt',``, function (err) {
    if (err) {
      // append failed
    } else {
      // done
    }
  })
  for (let i=0;i<outputs.length-1;i++){
    if(outputs[i]===result[i].toString()) {
      fs.appendFile('result.txt',`TC-001-00${i+1}: Passed \n`, function (err) {
        if (err) {
          // append failed
        } else {
          // done
        }
      })
    }
    else fs.appendFile('result.txt',`TC-001-00${i+1}: Failed \n`,(error)=>function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    })
  }

  if(outputs[9] > result[9]) {
    fs.appendFile('result.txt',`TC-001-00${10}: Passed \n`, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    }
    )
  }
  else fs.appendFile('result.txt',`TC-001-00${10}: Failed \n`,(error)=>function (err) {
    if (err) {
      // append failed
    } else {
      // done
    }
  })

  fs = require('fs').promises;
  const last_result = await fs.readFile('result.txt', "utf8");
  console.log(last_result)
return last_result
}

main()