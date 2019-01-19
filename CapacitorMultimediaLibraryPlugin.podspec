
  Pod::Spec.new do |s|
    s.name = 'CapacitorMultimediaLibraryPlugin'
    s.version = '1.0.0'
    s.summary = 'Multimedia library plugin for Capacitor'
    s.license = 'MIT'
    s.homepage = 'https://github.com/co-mmons/capacitor-multimedia-library-plugin'
    s.author = 'co.mmons'
    s.source = { :git => 'https://github.com/co-mmons/capacitor-multimedia-library-plugin', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
  end
