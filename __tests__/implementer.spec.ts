// implementerService.test.ts
import ImplementerService from '../src/services/implementer.service';

describe('ImplementerService', () => {
  let implementerService: ImplementerService;

  beforeEach(() => {
    implementerService = ImplementerService.getInstance();
  });

  test('parseBashCommands should return an array of commands', () => {
    const escapedString = "[\"touch hello-world.html\",\n\"echo '<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head>\\n  <meta charset=\\\"UTF-8\\\">\\n  <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n  <title>Hello World in JavaScript</title>\\n</head>\\n<body>\\n\\n</body>\\n</html>' > hello-world.html\",\n\"echo '<script>\\n  document.write(\\\"Hello, World!\\\");\\n</script>' >> hello-world.html\",\n\"echo '<!-- Or use this code for an alert box: -->' >> hello-world.html\",\n\"echo '<script>\\n  alert(\\\"Hello, World!\\\");\\n</script>' >> hello-world.html\"]";
    const expectedCommands = [
        'touch hello-world.html',
        "echo '<!DOCTYPE html>\n" +
          '<html lang="en">\n' +
          '<head>\n' +
          '  <meta charset="UTF-8">\n' +
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
          '  <title>Hello World in JavaScript</title>\n' +
          '</head>\n' +
          '<body>\n' +
          '\n' +
          '</body>\n' +
          "</html>' > hello-world.html",
        "echo '<script>\n" +
          '  document.write("Hello, World!");\n' +
          "</script>' >> hello-world.html",
        "echo '<!-- Or use this code for an alert box: -->' >> hello-world.html",
        `echo '<script>\n  alert("Hello, World!");\n</script>' >> hello-world.html`
      ]

    const result = implementerService.parseBashCommands(escapedString);
    console.log(result)
    expect(result).toEqual(expect.arrayContaining(expectedCommands));
  });
});