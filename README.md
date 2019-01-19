# capacitor-multimedia-library-plugin
Multimedia library plugin for Capacitor, allows to write and read from the device's multimedia library.

# Installation
For now (until Capacitor is in beta, and plugin is evolving) only installation from github. Every minor release will have a separate branch, so you may use #vX.X anchor in github link, e.g.:
```npm install git+https://github.com/co-mmons/capacitor-multimedia-library-plugin.git#v0.1```
Until Capacitor and plugin are final, every breaking change (either in api or configuration) will bump minor version (0.1.x, 0.2.x), non breaking changes bumps patch version (0.1.0, 0.2.1). You can also use master branch for latest version:
```npm install git+https://github.com/co-mmons/capacitor-multimedia-library-plugin.git```

# Configure Android app
Register plugin in MainActivity.java:
```
this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
  add(MultimediaLibraryPlugin.class);
}});
```

# Configure iOS app
Edit ios/App/Podfile and add pod to App target:
```
target 'App' do
  # ...other pods
  pod 'CapacitorMultimediaLibraryPlugin', :path => '../../node_modules/@co.mmons/capacitor-multimedia-library-plugin'  
end
```

# API
Plugin is accessed as any other Capacitor plugin -> ```Capacitor.Plugins.MultimediaLibrary```. Plugin methods are documented in plugin definition files.