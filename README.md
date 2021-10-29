# MediaLib Rebuild

## API

### dir

```JSON
"API": "http://{host}/dir"
```

1. 新建目录

   ```JSON
   //request
   "Method": "POST",
   "Header.Content-Type": "application/json",
   "Body": {	// raw/JSON
    	"path":	""
   }
   //response
   "status": 200/403,
   "Body": {
     "success": false/true,
     "message": "{some messages}",
     "url": "{the url of the dir}"
   }
   ```

   ```JSON
   // Example
   "Request.Body": {
     "path": "/blog"
   }
   
   //if success
   "Response.Status": 200,
   "Response.Body": {
     "success": true,
     "message": "mkdir ok",
     "url": "blog"
   }
   //if error
   "Response.Status": 403,
   "Response.Body": {
     "success": false,
     "message": "the dir has existed",
     "url": "blog"
   }
   ```

2. 删除目录

   ```JSON
   //request
   "Method":	"DELETE",
   "Header.Content-Type": "application/json",
   "Body": {	// raw/JSON
   	"path":	""
   }
   //response
   "status": 200/403,
   "Body": {
     "success": false/true,
     "message": "{some messages}",
     "url": "{the url of the dir}"
   }
   ```
   
   ```JSON
   // Example
   "Request.Body": {
     "path": "/blog"
   }
   
   //if success
   "Response.Status": 200,
   "Response.Body": {
     "success": true,
     "message": "rmDir ok",
     "url": "blog"
   }
   //if error
   "Response.Status": 403,
   "Response.Body": {
     "success": false,
     "message": "invalid dir",
     "url": "blog/me"
   }
   ```

3. 获取该目录内容

   ```JSON
   //request
   "Method": "GET",
   "QueryParams": {
   	"path":	""
   }
   //response
   "status": 200/403,
   "Body": {
     "success": false/true,
     "message": "{some messages}",
     "files": [],	//files in the dir
     "dirs": []		//sub dirs in the dir
   }
   ```
   
   ```JSON
   // Example
   "Request.QueryParams": {
     "path": "/"
   }
   
   //if success
   "Response.Status": 200,
   "Response.Body": {
     "success": true,
     "message": "readdir ok",
     "files": [
       "test.png"
     ],
     "dirs": [
       "blog",
       "me"
     ]
   }
   //if error
   "Response.Status": 403,
   "Response.Body": {
     "success": false,
     "message": "error in readdir",
     "files": [],
     "dirs": []
   }
   ```

### file

```JSON
"API": "http://{host}/file"
```

1. 上传文件

   ```JSON
   //request
   "Method": "POST",
   "Header.Content-Type": "application/json",
   "Body": {	// form-data
     "file",	// the file you want to upload
    	"path":	""
   }
   //response
   "status": 200/403,
   "Body": {
     "success": false/true,
     "message": "{some messages}",
     "url": "{the url of the file}"
   }
   ```

   ```JSON
   // Example
   "Request.form-data": {
     "file": example.png,
     "path": "/blog"
   }
   
   //if success
   "Response.Status": 200,
   "Response.Body": {
     "success": true,
     "message": "uploaded",
     "url": "http://{host}:3000/blog/example.png"
   }
   //if error
   "Response.Status": 403,
   "Response.Body": {
     "success": false,
     "message": "error in uploading",
     "url": null
   }
   ```

2. 删除文件

   ```JSON
   //request
   "Method": "DELETE",
   "Header.Content-Type": "multipart/form-data",
   "Body": {	// raw/JSON
   	"path":""
   }
   //response
   "status": 200/403,
   "Body": {
     "success": false/true,
     "message": "{some messages}",
     "url": "{the url of the file}"
   }
   ```
   
   ```JSON
   // Example
   "Request.Body": {
     "path": "/blog/example.png"
   }
   
   //if success
   "Response.Status": 200,
   "Response.Body": {
     "success": true,
     "message": "rmFile ok",
     "url": "/blog/example.png"
   }
   //if error
   "Response.Status": 403,
   "Response.Body": {
     "success": false,
     "message": "rmFile error",
     "url": "/blog/example.png"
   }
   ```

