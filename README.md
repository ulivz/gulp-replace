# replace
a Gulp file-replace and markdown-log-created task.

<br>

## Quick Start

Backup your files, and create a copy of what you need to do, then config your path of files in the `replace.config/config.json`,

This is an example:
```
{
  "path": [
    {
      "source": "replace.config/init/source/A.js",
      "target_bak": "replace.config/init/bak/A.js",
      "target": "src/A.js"
    },
    {
      "source": "replace.config/init/source/B.js",
      "target_bak": "replace.config/init/bak/B.js",
      "target": "src/B.js"
    }
  ]
}
```

Next install the required dependencies for the project:
```
npm install --save-dev gulp run-sequence fs path del events
```

Then you can replace the file with this instruction:
```
gulp replace
```

and Use the following instructions to restore the file:
```
gulp resume
```

You can also see the markdown file for the project execution process in:
```
replace.config/log/
```
A markdown file like this will give you a better understanding of the asynchronous execution of this project:

---

 **Create Time**: 12/31/2016, 1:00:51 AM<br>Type: replace

status|description
---|---
start|getJSON
finish|getJSON
start|mapJSON
file[0]|**source**:		replace.config/init/source/A.js<br>**target**:		src/A.js
file[1]|**source**:		replace.config/init/source/B.js<br>**target**:		src/B.js
finish|mapJSON
delete|target files
start|replace
finish|replace [file1]
finish|replace [file0]
finish|replace
finish|ALL

---

## Parameter Description:

parameters | note
---|---
source|path of the file to replace
target_bak|path of the target file backup
target|path of the target file

## Declaration

We can not determine what name should be used, so All versions of the same file must use the same name
<br>









    
