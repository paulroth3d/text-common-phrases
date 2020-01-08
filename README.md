# Overview

Simple project to identify common phrases

# Example:

```
// HappyBirthday.txt
Happy Birthday to You
Happy Birthday to You
Happy Birthday Dear (name)
Happy Birthday to You.
```

Either as a table

`npm run start -- -f ./testAssets/HappyBirthday.txt`

```
┌──────────────────────┬────────┐
│ Phrase               │ Weight │
├──────────────────────┼────────┤
│ birthday to          │ 3      │
├──────────────────────┼────────┤
│ to you\nhappy        │ 2      │
├──────────────────────┼────────┤
│ you\nhappy birthday  │ 2      │
├──────────────────────┼────────┤
│ happy birthday       │ 1      │
├──────────────────────┼────────┤
│ birthday dear        │ 1      │
├──────────────────────┼────────┤
│ dear name\nhappy     │ 1      │
├──────────────────────┼────────┤
│ name\nhappy birthday │ 1      │
├──────────────────────┼────────┤
│ to you.\n            │ 1      │
└──────────────────────┴────────┘
```

as CSV

`node index.js "-f" "testAssets/HappyBirthday.txt" "--csv"`

```
Phrase,Rating
"birthday to",3
"to you\nhappy",2
"you\nhappy birthday",2
"happy birthday",1
"birthday dear",1
"dear name\nhappy",1
"name\nhappy birthday",1
"to you.\n",1
```

or as JSON

`npm run start -- -f ./testAssets/HappyBirthday.txt --json --desc`

```
[
  [
    "birthday to",
    3
  ],
  [
    "to you\\nhappy",
    2
  ],
  [
    "you\\nhappy birthday",
    2
  ],
  [
    "happy birthday",
    1
  ],
  [
    "birthday dear",
    1
  ],
  [
    "dear name\\nhappy",
    1
  ],
  [
    "name\\nhappy birthday",
    1
  ],
  [
    "to you.\\n",
    1
  ]
]
```

# Arguments

<table>
	<tr><th>Flags</th><th>Description</th></tr>
	<tr><td>-h, --help</td><td>Prints help on the arguments</td></tr>
	<tr><td>-v, --version</td><td>Prints the version information</td></tr>
	<tr><td>-f, --file <filePath></td><td>file to load</td></tr>
	<tr><td>-n, --min <minCount></td><td>phrases occurring &gt;= min will be reported</td></tr>
	<tr><td>-x, --max <maxCount></td><td>phrases occurring &lt;= max will be reported</td></tr>
	<tr><td>-a, --asc</td><td>sorts in ascending order</td></tr>
	<tr><td>-d, --desc</td><td>sorts in descending order (default)</td></tr>
	<tr><td>-j, --json</td><td>returns results in JSON format</td></tr>
	<tr><td>-c, --csv</td><td>returns results in CSV format</td></tr>
</table>

# Internal

(94% code coverage - just run `npm run test:coverage`. Other commands available through `npm run`)