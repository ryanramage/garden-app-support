# Garden App Support

This is a kanso module that will be useful for apps that want to be used in the garden eco-system.

It provides:

 * Navigation that is consistent across apps.
 ** A home icon that is used in the nav bar to return a user back to the dashboard.
 ** A user icon that allows a user to manage login/logout

## Install

Add to your project's kanso.json dependencies setting, here is the minimal
case:

```json
"dependencies": {
    "garden-app-support": null
}
```

Run kanso install to install in your packages directory:

```
kanso install
```

## Configure

You will have to make changes to your .html files. Here are some examples for either single page apps, or duality apps.

### For single page apps

Edit your index.html and do the following

Add a css link:
```html
<link rel="stylesheet" type="text/css" href="static/css/garden-app.css" />
```

Add a 'garden-app' class to your nav bar

```html
    <div id="topbar" class="garden-app">
      <img id="logo" src="{{baseURL}}/static/img/kanso_topbar_logo.png" alt="Kanso" />
      <ul id="topnav">
        <li><a href="{{baseURL}}">Pages</a></li>
        <!--<li><a href="{{baseURL}}/_activity">Activity</a></li>-->
        <li><a href="{{baseURL}}/_help">Help</a></li>
      </ul>

    </div>
```

Add a js link after the modules.js link

```html
    <script type="text/javascript" src="modules.js"></script>
    <script type="text/javascript" src="static/js/jquery.garden-app.js"></script>
```


### For duality apps

Edit your base.html and do the following.

Add a css link:
```html
<link rel="stylesheet" type="text/css" href="{{baseURL}}/static/css/garden-app.css" />
```

Add a 'garden-app' class to your nav bar

```html
    <div id="topbar" class="garden-app">
      <img id="logo" src="{{baseURL}}/static/img/kanso_topbar_logo.png" alt="Kanso" />
      <ul id="topnav">
        <li><a href="{{baseURL}}">Pages</a></li>
        <!--<li><a href="{{baseURL}}/_activity">Activity</a></li>-->
        <li><a href="{{baseURL}}/_help">Help</a></li>
      </ul>

    </div>
```

Add a js link after the modules.js link

```html
    <script type="text/javascript" src="{{baseURL}}/modules.js"></script>
    <script type="text/javascript" src="{{baseURL}}/static/js/jquery.garden-app.js"></script>
```

And that is it. 



