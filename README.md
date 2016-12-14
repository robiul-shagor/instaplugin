# Instaplugin- A jQuery Instagram feed loader.

Instaplugin is a AJAX Instagram Feed loader. It's created for those person who want to reduce page loaded time and add instagram feed also.

### How to use it? 

1. Link files to your site or application (add `<script>` to bottom of page)

  ```html
  <link rel="stylesheet" href="css/instaplugin.css">
  <script src="js/jquery-3.1.0.min.js"></script>
  <script src="js/instaplugin.js"></script>
  ```

2. Set markup 

	```html
	<div id="instafeed" class="instaplugin"></div>
	```
	Add any ID or class name. But `instaplugin` class name required.

3. Finally declare the plugin settings after `<script src="js/instaplugin.js"></script>` .

	```html
	<script>
		$('#instafeed').instaplugin({
			accessTocken: 'YOUR ACCESS TOKEN',
			getData: 'user',
			user: 'YOUR USER NAME',
			tagedName: 'YOUR TAG',
			showImage: 8,
            column: 8,
            margin: false,
            padding: false,
			imageSize: 'meduim'
		});
	</script>
	```

	Look at `accessTocken: 'YOUR ACCESS TOKEN'` . `getData: 'user'` for get instagram feed data with user. If you want to show data with tag then add `getData: 'tag'`. 

	If you want to show data user then add `user: 'YOUR USER NAME'` or get data form tag use `tagedName: 'YOUR TAG'`.

	`showImage: 8` is how many images you want to show.

	`column: 8` is how many column you want to show.

	`margin: false` or `padding: false` is if you want to add margin or padding.

	`imageSize: 'meduim'` is which size you want to show. There are three type of image size. As like
	`small, medium, large, original`

### Who Wrote this?

Written by <a href="http://robiul-shagor.github.io/">Robiul Shagor</a>, made better for you.
