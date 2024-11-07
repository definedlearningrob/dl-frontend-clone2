## Changelog.md deprecation
Changelog.MD has been deprecated above version 2.0.0 in favor of [Github Releases](https://github.com/DefinedLearning/dl-frontend/releases)

## [2.0.0](https://github.com/DefinedLearning/dl-frontend/compare/v1.31.0...v2.0.0) (2022-11-15)


### ⚠ BREAKING CHANGES

* migrate from CRA to VITE

### Features

* [DC][DL] [DL-71] Add Matomo tracker  ([aa5c460](https://github.com/DefinedLearning/dl-frontend/commit/aa5c460de0f08d4680da35815d8c26f06065e3fb))
* [DC][PBL]  display portfolio plans ([#1028](https://github.com/DefinedLearning/dl-frontend/issues/1028)) ([9545e3c](https://github.com/DefinedLearning/dl-frontend/commit/9545e3cdfec8d851a3547e81eda1c52d68bd0be3))
* [DL] add welcome message on Course Library page  ([a5ed339](https://github.com/DefinedLearning/dl-frontend/commit/a5ed339f982eebf242c0e3f020b25caf47da271d))
* add ability to edit product display name and description ([b2fbba1](https://github.com/DefinedLearning/dl-frontend/commit/b2fbba1bf1de32063f5a07f724b34d8c05386df4))
* add ability to enable matomo tracking with env ([e0817e2](https://github.com/DefinedLearning/dl-frontend/commit/e0817e2582fe8e659fa22f45045b50c9964d4a0e))
* add ability to send code when tracking presentations ([4f358ae](https://github.com/DefinedLearning/dl-frontend/commit/4f358aeab2feede7346b8615aadf300bb581a908))
* add creating submissions by teacher in product grading ([185ac57](https://github.com/DefinedLearning/dl-frontend/commit/185ac572b475250f67371b0d12024e01f3fef9d1))
* add empty state to checkin not submitted grading ([9e1bf92](https://github.com/DefinedLearning/dl-frontend/commit/9e1bf9291e113dbb2e4a1c62ea16768b1d2b874e))
* add possibility to edit custom project display name ([#1074](https://github.com/DefinedLearning/dl-frontend/issues/1074)) ([aafbd7d](https://github.com/DefinedLearning/dl-frontend/commit/aafbd7de5030316fee44e04fe55a5c6a0b15d7ae))
* add track to project on public schema ([882e75b](https://github.com/DefinedLearning/dl-frontend/commit/882e75becaa60ae33ebf5a90c6956432ff3c1d01))
* add useToggle hook ([a39bc7c](https://github.com/DefinedLearning/dl-frontend/commit/a39bc7cd8df70b9f9f604191d40258768eea2602))
* adjust exploring course from pbl ability when user has access to DC ([459d6ff](https://github.com/DefinedLearning/dl-frontend/commit/459d6ff10f8cb45fb040ed25f9c9738e3b7a1f59))
* allow all non-student users to access standard search ([#1121](https://github.com/DefinedLearning/dl-frontend/issues/1121)) ([e8cfeea](https://github.com/DefinedLearning/dl-frontend/commit/e8cfeea1818518704d438090eedc596d779a8a86))
* enable i18n debug mode only in development ([d9e495c](https://github.com/DefinedLearning/dl-frontend/commit/d9e495cc7bba99f8108dc4872bea24e0506e990b))
* improve user detection in slide tracking ([a443362](https://github.com/DefinedLearning/dl-frontend/commit/a443362204407bbf8c79e89175faab6472f7ca52))
* migrate from CRA to VITE ([bda630d](https://github.com/DefinedLearning/dl-frontend/commit/bda630d330d27790521f1516b7b671f53e796061))
* narrow down service type in get shared resource ([8215155](https://github.com/DefinedLearning/dl-frontend/commit/82151558e4070ab7b88431fe3eb997649ac13333))
* redirect to a new resource with code from share links ([967e560](https://github.com/DefinedLearning/dl-frontend/commit/967e560a2dcf650250e5c54cd64e8cd8f4cdde50))
* send auth token when visiting shared project authenticated ([8b9964d](https://github.com/DefinedLearning/dl-frontend/commit/8b9964dfaa1a8f104f05738d4367f8f5b98a5041))
* show experience in dc button when shared link owner has access to careers ([8f2e415](https://github.com/DefinedLearning/dl-frontend/commit/8f2e4155d9181cb71d7495cfe7cc87c969b72a3c))
* tabs based on resolution ([#1097](https://github.com/DefinedLearning/dl-frontend/issues/1097)) ([cbe3142](https://github.com/DefinedLearning/dl-frontend/commit/cbe31423ae6bbb094d001db09c0558115a60059f))


### Bug Fixes

* [DL] add fallback for course without units  ([7894161](https://github.com/DefinedLearning/dl-frontend/commit/7894161b2228d0b8bed3be32e47d49c0651da7f4))
* [DL] adjust assets import in WelcomeMessage ([#1119](https://github.com/DefinedLearning/dl-frontend/issues/1119)) ([aa7d29b](https://github.com/DefinedLearning/dl-frontend/commit/aa7d29bcbad0a7a5895ba4e0edd584dd3557b082))
* [DL] translation in searchbar ([09247bd](https://github.com/DefinedLearning/dl-frontend/commit/09247bdbf37e5308a288e57b136438225b99578d))
* add missing required translations ([4b71c66](https://github.com/DefinedLearning/dl-frontend/commit/4b71c663aed1905a594d9b0d91b8a71b65a58cfe))
* add missing spacing in project for user/shared ([feb4233](https://github.com/DefinedLearning/dl-frontend/commit/feb423384e6b1c605c4e011a1720b070b6121ac7))
* add missing thumbnailUrl in graphql standard tasks ([e638e21](https://github.com/DefinedLearning/dl-frontend/commit/e638e21240c07f6ac00e6a67db4567fe9dec6007))
* add missing xxs size for icons in pbl ([b8d27d2](https://github.com/DefinedLearning/dl-frontend/commit/b8d27d2b8cbd8d3b64e126da24635e05a012cd29))
* add popovers to icon buttons ([#1072](https://github.com/DefinedLearning/dl-frontend/issues/1072)) ([8a0a79e](https://github.com/DefinedLearning/dl-frontend/commit/8a0a79e5fc4aa3291617cfdbd67e4140d1fd2e2c))
* btn preview ([#1096](https://github.com/DefinedLearning/dl-frontend/issues/1096)) ([3368ff2](https://github.com/DefinedLearning/dl-frontend/commit/3368ff2b6f31c793e8ebacf1bb2aa472f31ef4a2))
* clear message context when not needed ([130c64a](https://github.com/DefinedLearning/dl-frontend/commit/130c64a5192c35ce42fad59d7fcb91bff97f7043))
* display task table with displayName instead of name ([#1092](https://github.com/DefinedLearning/dl-frontend/issues/1092)) ([434fda5](https://github.com/DefinedLearning/dl-frontend/commit/434fda5303a850be72c3d8f3bf8b7e914fd973c8))
* display teacher name on students grading result comments ([ed6070a](https://github.com/DefinedLearning/dl-frontend/commit/ed6070ace5fdaee8ec4b1332d500926e7f90702d))
* displayName in assigned projects ([#1095](https://github.com/DefinedLearning/dl-frontend/issues/1095)) ([16123ca](https://github.com/DefinedLearning/dl-frontend/commit/16123ca2b1b21240c2a6cabd6d32ef01c223a5d0))
* handle empty data for single connected course ([#1085](https://github.com/DefinedLearning/dl-frontend/issues/1085)) ([9f93589](https://github.com/DefinedLearning/dl-frontend/commit/9f93589b239f86f1835342d834516e377dd3282c))
* improve actions names and concurrency ([d139be2](https://github.com/DefinedLearning/dl-frontend/commit/d139be2b34b86927d8b22561ecd50211f1d2cc75))
* no slides issue ([#1073](https://github.com/DefinedLearning/dl-frontend/issues/1073)) ([3188aa5](https://github.com/DefinedLearning/dl-frontend/commit/3188aa5eacb4da9fd67f55a1e44d093143f04791))
* not displaying grading indicator on sidebar ([9dbd00e](https://github.com/DefinedLearning/dl-frontend/commit/9dbd00e6217ab21630bf81156c45944e9fdc445b))
* preview button ([#1089](https://github.com/DefinedLearning/dl-frontend/issues/1089)) ([944e792](https://github.com/DefinedLearning/dl-frontend/commit/944e792277c84c73b18ef83a9cd58d6743adf8cf))
* resumes display + create new project button ([#1118](https://github.com/DefinedLearning/dl-frontend/issues/1118)) ([efe9d8e](https://github.com/DefinedLearning/dl-frontend/commit/efe9d8eceb501cda89d9d144b1662d8c3edc16ee))
* size of courses Cards ([#1084](https://github.com/DefinedLearning/dl-frontend/issues/1084)) ([29812a9](https://github.com/DefinedLearning/dl-frontend/commit/29812a9147c3751df5b61400ae3dbb36a7518958))
* size of courses Cards ([#1087](https://github.com/DefinedLearning/dl-frontend/issues/1087)) ([5041e11](https://github.com/DefinedLearning/dl-frontend/commit/5041e1125f079d02bc35c9be22d1d49f0a6a6eb1))
* tabs width with ellipsis ([#1101](https://github.com/DefinedLearning/dl-frontend/issues/1101)) ([7c1d37d](https://github.com/DefinedLearning/dl-frontend/commit/7c1d37d947c3a241a8d93bd0a3df731809b157a9))
* vite env usage ([#1098](https://github.com/DefinedLearning/dl-frontend/issues/1098)) ([8f51d25](https://github.com/DefinedLearning/dl-frontend/commit/8f51d25ab49c3ee8d4c4a71ab9b083c1dbf6eaa9))


## [1.33.0](https://github.com/DefinedLearning/dl-frontend/compare/v1.32.0...v1.33.0) (2022-10-26)


### Features

* feat: allow all non-student users to access standard search

### Bug Fixes

* build: add polyfill for ES2018-ES2022 to support old browsers
* fix: icons size on safari


## [1.32.0](https://github.com/DefinedLearning/dl-frontend/compare/v1.31.0...v1.32.0) (2022-10-26)


### Features

* add standards search ([PR](https://github.com/DefinedLearning/dl-frontend/pull/1091))

## [1.31.0](https://github.com/DefinedLearning/dl-frontend/compare/v1.30.0...v1.31.0) (2022-10-26)


### Features

* add points display to student submission ([c61c705](https://github.com/DefinedLearning/dl-frontend/commit/c61c705ea705ffb4f22bdfbaed7120ec36d64cb6))
* display connected courses in PBL task ([#1052](https://github.com/DefinedLearning/dl-frontend/issues/1052)) ([6193cbc](https://github.com/DefinedLearning/dl-frontend/commit/6193cbc4b0aea0da3d83677780b77b81a56674b1))
* display single connected course ([#1079](https://github.com/DefinedLearning/dl-frontend/issues/1079)) ([201144f](https://github.com/DefinedLearning/dl-frontend/commit/201144f11222f546dd412253295d407adc7d8167))
* projectName error message ([#1068](https://github.com/DefinedLearning/dl-frontend/issues/1068)) ([11d0e75](https://github.com/DefinedLearning/dl-frontend/commit/11d0e75e2562833bfc0127c2d9c21b28d2dc2d31))


### Bug Fixes

* change assignment to the course notification text ([#1069](https://github.com/DefinedLearning/dl-frontend/issues/1069)) ([6e7cf5b](https://github.com/DefinedLearning/dl-frontend/commit/6e7cf5be0c9422a2f00f9c7578150501848b276f))
* change labels for the 'Defined Careers' tab ([#1062](https://github.com/DefinedLearning/dl-frontend/issues/1062)) ([4f3d521](https://github.com/DefinedLearning/dl-frontend/commit/4f3d521bd200933fe5dff811f3f048a0945bdbe4))
* hide 'defined career' tab when connections are empty ([#1061](https://github.com/DefinedLearning/dl-frontend/issues/1061)) ([d910e12](https://github.com/DefinedLearning/dl-frontend/commit/d910e12ca4471aa42ddc32dc63bb61cef4d0693d))
* logut redirect hotfix ([4c63aee](https://github.com/DefinedLearning/dl-frontend/commit/4c63aeeb475f1385fc5cd3ebae9a88c7c71be989))
* presentation themes not loaded on public view ([ddf790a](https://github.com/DefinedLearning/dl-frontend/commit/ddf790a163a24002b8c826d15e096ff2d19581c4))
* using code when accessing project through lesson ([cc3c876](https://github.com/DefinedLearning/dl-frontend/commit/cc3c876111d65c3501e2013f0d7642e703bccdab))

## [1.30.0](https://github.com/DefinedLearning/dl-frontend/compare/v1.29.0...v1.30.0) (2022-10-12)


### Features

* [DC] add redirect to saved url after login ([dd55b37](https://github.com/DefinedLearning/dl-frontend/commit/dd55b37c20d779e27fe1fb2f61bd1ec794a1457c))
* [PBL] add redirect to saved url after login ([bec9e54](https://github.com/DefinedLearning/dl-frontend/commit/bec9e54e6372dea3fe5be7a8d1d0703e5b257b77))
* add not found page to guest app project ([90df92c](https://github.com/DefinedLearning/dl-frontend/commit/90df92ccad32746e9cf1aa8a05ff072cdb90b142))
* add permission handling to marketing links ([ee41ddf](https://github.com/DefinedLearning/dl-frontend/commit/ee41ddfa3afe414fe890e7b170e4cb1d0123925a))
* add possibility to connect courses to tasks ([#1046](https://github.com/DefinedLearning/dl-frontend/issues/1046)) ([b7620db](https://github.com/DefinedLearning/dl-frontend/commit/b7620dba926172be04b9507eff18199ef32595d6))
* add shared redirect context provider ([7f5db83](https://github.com/DefinedLearning/dl-frontend/commit/7f5db83a0f22c5f177db335e978b754f0c47e5d8))
* add shared resource marketing links ([9740053](https://github.com/DefinedLearning/dl-frontend/commit/974005391cd0b12057787755f1ee4c1731e07fed))
* handle shared projects between users ([dcdd135](https://github.com/DefinedLearning/dl-frontend/commit/dcdd135124705d8df25ae7aa9b35afe19df79bc5))
* highlighted-catalog-design-modification ([#1030](https://github.com/DefinedLearning/dl-frontend/issues/1030)) ([9c84c57](https://github.com/DefinedLearning/dl-frontend/commit/9c84c57c7bd6467004165d5f46d3bfd0600f67d1))


### Bug Fixes

* [PBL] Fixing translations for rubrics ([#1044](https://github.com/DefinedLearning/dl-frontend/issues/1044)) ([def4c71](https://github.com/DefinedLearning/dl-frontend/commit/def4c715f590c464db17af99f491057dd4f5184d))
* change 'highlighted' to 'featured' label ([#1053](https://github.com/DefinedLearning/dl-frontend/issues/1053)) ([7084c48](https://github.com/DefinedLearning/dl-frontend/commit/7084c489f6804849ad4005460fe7ffa1be5610ac))
* highlighted element hide if empty arr ([#1051](https://github.com/DefinedLearning/dl-frontend/issues/1051)) ([14818fa](https://github.com/DefinedLearning/dl-frontend/commit/14818faa8ab41137db569c9fffa0479f446feaa8))
* initial user state with redirect logic ([2b452cb](https://github.com/DefinedLearning/dl-frontend/commit/2b452cbcd6b317853344095ddbc289b882dcafa6))
* products and standards not working on shared resource ([02a8c9c](https://github.com/DefinedLearning/dl-frontend/commit/02a8c9c5a15cdb2b4d17cbbee60abe0fbffe16da))
* resizing card image ([#1050](https://github.com/DefinedLearning/dl-frontend/issues/1050)) ([2317571](https://github.com/DefinedLearning/dl-frontend/commit/2317571f6ceccd8a854cdcff6a547f036009564d))
* usage of deprecated createdAt field ([174bc89](https://github.com/DefinedLearning/dl-frontend/commit/174bc89ba94094288be77d91ed7da9c9993a9c07))

## [1.29.0](https://github.com/DefinedLearning/dl-frontend/compare/v1.28.1...v1.29.0) (2022-10-04)


### Features

* [DC] add courseId to updateCheckinAnswer mutation ([29ce979](https://github.com/DefinedLearning/dl-frontend/commit/29ce979660bbdb8b932c79a7fa8cfc6a31dd7577))
* [PBL] [#1034](https://github.com/DefinedLearning/dl-frontend/issues/1034) view grading by student ([98d6433](https://github.com/DefinedLearning/dl-frontend/commit/98d64333db6a44cc5945d52ab05851aa0e393439))
* [PBL] add files upload/delete by teacher in student submissions ([0df4afe](https://github.com/DefinedLearning/dl-frontend/commit/0df4afe534ef8ac14b46020827b1e6491abc2267))
* [PBL] implement product submitter block student ([a9cfb00](https://github.com/DefinedLearning/dl-frontend/commit/a9cfb003bf331f9692126c7ac7e0bd298ed178d1))
* add tooltip and greyedout state for grading products button ([b894076](https://github.com/DefinedLearning/dl-frontend/commit/b89407680408c0a7b0a8f6158a0de0f42b1c8cc2))
* use updated at in activity log to support future entries ([fa792b2](https://github.com/DefinedLearning/dl-frontend/commit/fa792b2c4dbd80d807533a2a4268bc170291947a))


### Bug Fixes

* [PBL] not showing overview when desc is not provided ([b4dee8c](https://github.com/DefinedLearning/dl-frontend/commit/b4dee8c00c16ca87c86c70ea32871d0b73e73baf))
* #DL-69 #DL-77 grade button visibilty when logged out ([e8763b6](https://github.com/DefinedLearning/dl-frontend/commit/e8763b638889686b4e25b754376c796741fef108))
* dont show results button before graded ([4ba187f](https://github.com/DefinedLearning/dl-frontend/commit/4ba187f29a38f0e8715ca8cc4b1cf09bbf8eb4cc))
* wrong env assertion in spec tests ([d0f95e3](https://github.com/DefinedLearning/dl-frontend/commit/d0f95e3c8de1be6547f109b4cc313bee41f63dd1))


## [1.28.1](https://github.com/DefinedLearning/dl-frontend/compare/v1.28.0...v1.28.1) (2022-09-29)

### Bug Fixes
* [PBL] Fix catalogs text overflow

## v.1.28.0 (2022-09-29)

#### Bug Fix
* [#1005](https://github.com/DefinedLearning/dl-frontend/pull/1005) fix: back button presentation ([@kPoziomek](https://github.com/kPoziomek))
* [#1008](https://github.com/DefinedLearning/dl-frontend/pull/1008) fix: fix vanishing login btn after page refresh ([@kPoziomek](https://github.com/kPoziomek))
* [#1004](https://github.com/DefinedLearning/dl-frontend/pull/1004) fix: display number of projects on card ([@kPoziomek](https://github.com/kPoziomek))
* [#1002](https://github.com/DefinedLearning/dl-frontend/pull/1002) fix: checkin display counter ([@kPoziomek](https://github.com/kPoziomek))
* [#989](https://github.com/DefinedLearning/dl-frontend/pull/989) fix: messaging labels ([@jkisiolek](https://github.com/jkisiolek))
* [#988](https://github.com/DefinedLearning/dl-frontend/pull/988) Feature pbl/table of content improvement ([@kPoziomek](https://github.com/kPoziomek))

#### Enhancement
* [#984](https://github.com/DefinedLearning/dl-frontend/pull/984) Feature pbl/capture presentation slide ([@kPoziomek](https://github.com/kPoziomek))
* [#985](https://github.com/DefinedLearning/dl-frontend/pull/985) feat: add possibility to message student directly from class view ([@jkisiolek](https://github.com/jkisiolek))
* [#979](https://github.com/DefinedLearning/dl-frontend/pull/979) Fix/messaging ([@jkisiolek](https://github.com/jkisiolek))

#### New Feature
* [#1012](https://github.com/DefinedLearning/dl-frontend/pull/1022) feat: #997 [PBL] add teacher rubric grading ([@k1eu](https://github.com/k1eu))
* [#1022](https://github.com/DefinedLearning/dl-frontend/pull/1022) feat: single catalog design ([@kPoziomek](https://github.com/kPoziomek))
* [#1020](https://github.com/DefinedLearning/dl-frontend/pull/1020) feat: add username and email filtering to users view ([@jkisiolek](https://github.com/jkisiolek))
* [#1009](https://github.com/DefinedLearning/dl-frontend/pull/1009) feat: added catalog card description to dashboard ([@kPoziomek](https://github.com/kPoziomek))
* [#1016](https://github.com/DefinedLearning/dl-frontend/pull/1016) Add new filters to admin's students view ([@jkisiolek](https://github.com/jkisiolek))
* [#1011](https://github.com/DefinedLearning/dl-frontend/pull/1011) Feat/1026 impersonate in pbl ([@jkisiolek](https://github.com/jkisiolek))
* [#1003](https://github.com/DefinedLearning/dl-frontend/pull/1003) feat: remove preview btn from preview-view ([@kPoziomek](https://github.com/kPoziomek))
* [#997](https://github.com/DefinedLearning/dl-frontend/pull/997) feat: added task Count to catalog cards ([@kPoziomek](https://github.com/kPoziomek))
* [#998](https://github.com/DefinedLearning/dl-frontend/pull/998) feat: add resumes to pbl portfolio ([@jkisiolek](https://github.com/jkisiolek))
* [#982](https://github.com/DefinedLearning/dl-frontend/pull/982) feat : [PBL] portfolio projects crud ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 4
- Jarosław Kisiołek ([@jkisiolek](https://github.com/jkisiolek))
- Jesse ([@velociringer](https://github.com/velociringer))
- Krzysztof Poziomek ([@kPoziomek](https://github.com/kPoziomek))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))

## v1.27.1 (2022-08-22)

#### Bug Fix
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] rubrics tab in product modal tabs ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] empty portfolio max width ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] user dashboard skeleton border radius ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] checkin header not aligned center ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] checkins whitescreen ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] show previous next student always when picked student ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] hide textarea for messaging ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] add guards to grading fucntions ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] not displaying school classes assigned to project ([@k1eu](https://github.com/k1eu))
* [#980](https://github.com/DefinedLearning/dl-frontend/pull/980) fix: [PBL] allow login optional when already logged in ([@k1eu](https://github.com/k1eu))
* [#978](https://github.com/DefinedLearning/dl-frontend/pull/978) fix: [PBL] portfolio tile on student dashboard ([@kPoziomek](https://github.com/kPoziomek))

#### Committers: 2
- Krzysztof Poziomek ([@kPoziomek](https://github.com/kPoziomek))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
## v1.27.0 (2022-08-22)

#### Bug Fix
* [#972](https://github.com/DefinedLearning/dl-frontend/pull/972) fix: [PBL] portfolio projects cards ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#954](https://github.com/DefinedLearning/dl-frontend/pull/954) fix: shared slides header info and sales admin permission to edit shared slides ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#953](https://github.com/DefinedLearning/dl-frontend/pull/953) fix: global shared files ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Enhancement
* [#973](https://github.com/DefinedLearning/dl-frontend/pull/973) feat: tableOfContent added to next views ([@kPoziomek](https://github.com/kPoziomek))
* [#969](https://github.com/DefinedLearning/dl-frontend/pull/969) Apply messaging design ([@jkisiolek](https://github.com/jkisiolek))
* [#971](https://github.com/DefinedLearning/dl-frontend/pull/971) feat: [PBL] add need review indicator to school classes sidebar in grading ([@k1eu](https://github.com/k1eu))
* [#944](https://github.com/DefinedLearning/dl-frontend/pull/944) feat: catalogs multi selection ([@velociringer](https://github.com/velociringer))
* [#960](https://github.com/DefinedLearning/dl-frontend/pull/960) Feature pbl/styling students dashboard improvment ([@kPoziomek](https://github.com/kPoziomek))
* [#957](https://github.com/DefinedLearning/dl-frontend/pull/957) fix: truncate long text added tooltip ([@kPoziomek](https://github.com/kPoziomek))
* [#949](https://github.com/DefinedLearning/dl-frontend/pull/949) fix: implemented styling to students dashboard ([@kPoziomek](https://github.com/kPoziomek))
* [#942](https://github.com/DefinedLearning/dl-frontend/pull/942) fix: PBL styles improvement ([@kPoziomek](https://github.com/kPoziomek))

#### New Feature
* [#945](https://github.com/DefinedLearning/dl-frontend/pull/945) feat: extract messaging module to shared directory (#942) ([@jkisiolek](https://github.com/jkisiolek))
* [#956](https://github.com/DefinedLearning/dl-frontend/pull/945) feat: check in questions grading ([@jkisiolek](https://github.com/jkisiolek))

#### Committers: 5
- Jarosław Kisiołek ([@jkisiolek](https://github.com/jkisiolek))
- Jesse ([@velociringer](https://github.com/velociringer))
- Krzysztof Poziomek ([@kPoziomek](https://github.com/kPoziomek))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))

## v1.26.0 (2022-07-08)

#### Bug Fix
* [#915](https://github.com/DefinedLearning/dl-frontend/pull/915) fix: cancel button on browse copies modal ([@felipebetts](https://github.com/felipebetts))
* [#897](https://github.com/DefinedLearning/dl-frontend/pull/897) Fix dc general issues ([@felipebetts](https://github.com/felipebetts))

#### Enhancement
* [#893](https://github.com/DefinedLearning/dl-frontend/pull/893) refactor: [SHARED] modal close button ([@felipebetts](https://github.com/felipebetts))

#### New Feature
* [#904](https://github.com/DefinedLearning/dl-frontend/pull/904) feat: [PBL] add product submissions ([@k1eu](https://github.com/k1eu))
* [#907](https://github.com/DefinedLearning/dl-frontend/pull/907) feat: [DC] Bug Fixes List ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#901](https://github.com/DefinedLearning/dl-frontend/pull/901) Feat 918 self assign by ([@felipebetts](https://github.com/felipebetts))
* [#896](https://github.com/DefinedLearning/dl-frontend/pull/896) feat: [PBL] add checkins from library to project ([@k1eu](https://github.com/k1eu))

#### Committers: 4
- Felipe Betts ([@felipebetts](https://github.com/felipebetts))
- Jesse ([@velociringer](https://github.com/velociringer))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))

## v1.25.0 (2022-06-06)

#### Bug Fix
* [#885](https://github.com/DefinedLearning/dl-frontend/pull/885) fix: [DC] fix activity log cache when context is user ([@k1eu](https://github.com/k1eu))
* [#871](https://github.com/DefinedLearning/dl-frontend/pull/871) fix: [DC] changing the step logic to use a counter #883 ([@velociringer](https://github.com/velociringer))
* [#870](https://github.com/DefinedLearning/dl-frontend/pull/870) Fix/login page ([@velociringer](https://github.com/velociringer))

#### Enhancement
* [#869](https://github.com/DefinedLearning/dl-frontend/pull/869) feat: [PBL] consistent cards redesign & data fetching suspense ([@k1eu](https://github.com/k1eu))

#### New Feature
* [#890](https://github.com/DefinedLearning/dl-frontend/pull/890) Feat 859 presentation changes ([@velociringer](https://github.com/velociringer))
* [#879](https://github.com/DefinedLearning/dl-frontend/pull/879) feat: [PBL] #895 Checkin Library v1 ([@k1eu](https://github.com/k1eu))
* [#873](https://github.com/DefinedLearning/dl-frontend/pull/873) feat: [PBL] #876 CheckinQuestion Answers ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#872](https://github.com/DefinedLearning/dl-frontend/pull/872) feat: [PBL] #877 student dashboard components ([@k1eu](https://github.com/k1eu))

#### Committers: 4
- Jesse ([@velociringer](https://github.com/velociringer))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Natalia Witek ([@witeknatalia](https://github.com/witeknatalia))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))

## v1.24.0 (2022-04-28)

#### Bug Fix
* [#851](https://github.com/DefinedLearning/dl-frontend/pull/851) fix: [DC]  updated contactUs translation to -> instead of . #836 ([@velociringer](https://github.com/velociringer))
* [#846](https://github.com/DefinedLearning/dl-frontend/pull/846) fix: [PBL] fix cards refresh on dashboard ([@k1eu](https://github.com/k1eu))
* [#844](https://github.com/DefinedLearning/dl-frontend/pull/844) fix: [DC] tabs on portfolio projects page ([@michalgren](https://github.com/michalgren))

#### New Feature
* [#861](https://github.com/DefinedLearning/dl-frontend/pull/861) feat: [DC] [PBL] add shared carousel with assigned projects on pbl ([@k1eu](https://github.com/k1eu))
* [#857](https://github.com/DefinedLearning/dl-frontend/pull/857) feat: [SHARED] add shared activity log & pbl my-classes activity ([@k1eu](https://github.com/k1eu))
* [#831](https://github.com/DefinedLearning/dl-frontend/pull/831) feat: [DC] adds dual pagination possibility to queries ([@Wozniaxos](https://github.com/Wozniaxos))
* [#842](https://github.com/DefinedLearning/dl-frontend/pull/842) feat: [PBL] #854 Teacher Dashboard with Project Assignment ([@k1eu](https://github.com/k1eu))
* [#839](https://github.com/DefinedLearning/dl-frontend/pull/839) Feat: [DC] #849 support link helpscout ([@velociringer](https://github.com/velociringer))

#### Committers: 6
- Jesse ([@velociringer](https://github.com/velociringer))
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Natalia Witek ([@witeknatalia](https://github.com/witeknatalia))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.23.1 (2022-04-08)
#### Bug Fix
* [#841](https://github.com/DefinedLearning/dl-frontend/pull/841) fix: [DC] iframe and video script directions ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#840](https://github.com/DefinedLearning/dl-frontend/pull/840) fix: [DC] line height issues ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### New Feature
* [#843](https://github.com/DefinedLearning/dl-frontend/pull/843) feat: [DC] script tags margins ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 1
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
## v1.23.0 (2022-04-04)
#### Bug Fix
* [#829](https://github.com/DefinedLearning/dl-frontend/pull/829) feat: [DC] lists bullets ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#801](https://github.com/DefinedLearning/dl-frontend/pull/801) fix: [DC] infite scroll in school class page ([@k1eu](https://github.com/k1eu))
* [#775](https://github.com/DefinedLearning/dl-frontend/pull/775) feat: [DC] add scrollbar to extension list ([@k1eu](https://github.com/k1eu))
* [#772](https://github.com/DefinedLearning/dl-frontend/pull/772) fix: [DC] course complete screen ([@k1eu](https://github.com/k1eu))
* [#771](https://github.com/DefinedLearning/dl-frontend/pull/771) feat: [DC][Shared] adds multiline text hilite padding to tinyMCE ([@Wozniaxos](https://github.com/Wozniaxos))

#### Enhancement
* [#799](https://github.com/DefinedLearning/dl-frontend/pull/799) build: add css order ignore and eslint dev ingore ([@k1eu](https://github.com/k1eu))
* [#774](https://github.com/DefinedLearning/dl-frontend/pull/774) feat: [DC] #793 add needs review badge to entity and system admin users list ([@k1eu](https://github.com/k1eu))
* [#766](https://github.com/DefinedLearning/dl-frontend/pull/766) refactor: [DC] improve lesson table of content query student view ([@k1eu](https://github.com/k1eu))
* [#764](https://github.com/DefinedLearning/dl-frontend/pull/764) feat: [DC] text id to contentId and improves presentation performance ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#832](https://github.com/DefinedLearning/dl-frontend/pull/832) feat: [DC][PBL] image position + media queries ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#815](https://github.com/DefinedLearning/dl-frontend/pull/815) feat: [PBL] add fullscreen and arrows to presentation display ([@k1eu](https://github.com/k1eu))
* [#808](https://github.com/DefinedLearning/dl-frontend/pull/808) feat: [DC] table of contents slide names ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#807](https://github.com/DefinedLearning/dl-frontend/pull/807) feat: [DC] #836 text update on main page ([@velociringer](https://github.com/velociringer))
* [#707](https://github.com/DefinedLearning/dl-frontend/pull/707) feat: [PBL] #762 add presentation builder and display to PBL ([@k1eu](https://github.com/k1eu))
* [#798](https://github.com/DefinedLearning/dl-frontend/pull/798) feat: [DC] table of contents ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#795](https://github.com/DefinedLearning/dl-frontend/pull/795) feat: [DC] #832 adds presentation mutli fonts support ([@Wozniaxos](https://github.com/Wozniaxos))
* [#792](https://github.com/DefinedLearning/dl-frontend/pull/792) feat: [DC] presentation builder headings ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#791](https://github.com/DefinedLearning/dl-frontend/pull/791) feat: [DC] adds shared slides ([@Wozniaxos](https://github.com/Wozniaxos))
* [#784](https://github.com/DefinedLearning/dl-frontend/pull/784) feat: [DC] Slide background images ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#783](https://github.com/DefinedLearning/dl-frontend/pull/783) feat: [PBL] add grades label ([@k1eu](https://github.com/k1eu))
* [#781](https://github.com/DefinedLearning/dl-frontend/pull/781) feat: [DC] Presentation preview fullscreen mode ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#776](https://github.com/DefinedLearning/dl-frontend/pull/776) feat:[DC] Presentation status in presentation settings ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#769](https://github.com/DefinedLearning/dl-frontend/pull/769) feat: [DC] add unassigning extensions from entity & multiple fixes ([@k1eu](https://github.com/k1eu))

#### Committers: 6
- Jesse ([@velociringer](https://github.com/velociringer))
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Natalia Witek ([@witeknatalia](https://github.com/witeknatalia))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.22.1 (2022-03-02)

#### Bug Fix
* [#775](https://github.com/DefinedLearning/dl-frontend/pull/775) feat: [DC] add scrollbar to extension list ([@k1eu](https://github.com/k1eu))
* [#772](https://github.com/DefinedLearning/dl-frontend/pull/772) fix: [DC] course complete screen ([@k1eu](https://github.com/k1eu))
* [#771](https://github.com/DefinedLearning/dl-frontend/pull/771) feat: [DC][Shared] adds multiline text hilite padding to tinyMCE ([@Wozniaxos](https://github.com/Wozniaxos))

#### Enhancement
* [#766](https://github.com/DefinedLearning/dl-frontend/pull/766) refactor: [DC] improve lesson table of content query student view ([@k1eu](https://github.com/k1eu))
* [#764](https://github.com/DefinedLearning/dl-frontend/pull/764) feat: [DC] text id to contentId and improves presentation performance ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#769](https://github.com/DefinedLearning/dl-frontend/pull/769) feat: [DC] add unassigning extensions from entity & multiple fixes ([@k1eu](https://github.com/k1eu))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))

## v1.22.0 (2022-02-17)

#### Bug Fix
* [#680](https://github.com/DefinedLearning/dl-frontend/pull/680) fix: [DC] portfolio thumbnails on teacher view ([@k1eu](https://github.com/k1eu))
* [#668](https://github.com/DefinedLearning/dl-frontend/pull/668) fix: [DC] moves reauth to apps ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#728](https://github.com/DefinedLearning/dl-frontend/pull/728) feat: [DC] #749 add extension fields ([@k1eu](https://github.com/k1eu))
* [#744](https://github.com/DefinedLearning/dl-frontend/pull/744) feat: [DC] #805 add assessment report generation ([@k1eu](https://github.com/k1eu))
* [#734](https://github.com/DefinedLearning/dl-frontend/pull/734) feat:  [DC] Slides List Drag and Drop ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#733](https://github.com/DefinedLearning/dl-frontend/pull/733) feat: [DC] #800 adds script view to video template ([@Wozniaxos](https://github.com/Wozniaxos))
* [#719](https://github.com/DefinedLearning/dl-frontend/pull/719) feat: [DC] Implement subslides ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#716](https://github.com/DefinedLearning/dl-frontend/pull/716) feat: [DC] #778 presentation video template ([@Wozniaxos](https://github.com/Wozniaxos))
* [#705](https://github.com/DefinedLearning/dl-frontend/pull/705) feat: [DC] #770 presentation-builder text image template ([@Wozniaxos](https://github.com/Wozniaxos))
* [#701](https://github.com/DefinedLearning/dl-frontend/pull/701) feat: [PBL] adds tracking to task view ([@Wozniaxos](https://github.com/Wozniaxos))
* [#675](https://github.com/DefinedLearning/dl-frontend/pull/675) feat: [DC] [PBL] add accessible shared modal ([@k1eu](https://github.com/k1eu))
* [#690](https://github.com/DefinedLearning/dl-frontend/pull/690) feat: [PBL] #758 add basic project customization ([@k1eu](https://github.com/k1eu))
* [#669](https://github.com/DefinedLearning/dl-frontend/pull/669) WIP: feat:  [DC] presentation builder ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 5
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Natalia Witek ([@witeknatalia](https://github.com/witeknatalia))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.21.0 (2021-12-13)

#### Bug Fix
* [#636](https://github.com/DefinedLearning/dl-frontend/pull/636) fix: [DC] #694 fix results assessment ordering ([@Wozniaxos](https://github.com/Wozniaxos))

#### Enhancement
* [#639](https://github.com/DefinedLearning/dl-frontend/pull/639) chore: [DC] move cypress to develop merge, reinstall packages ([@Wozniaxos](https://github.com/Wozniaxos))
* [#617](https://github.com/DefinedLearning/dl-frontend/pull/617) build: update packages  ([@k1eu](https://github.com/k1eu))

#### New Feature
* [#652](https://github.com/DefinedLearning/dl-frontend/pull/652) feat: add target blank option to rich text editor ([@k1eu](https://github.com/k1eu))
* [#653](https://github.com/DefinedLearning/dl-frontend/pull/653) fix: [DC] add student settings when assesment is not done ([@k1eu](https://github.com/k1eu))
* [#647](https://github.com/DefinedLearning/dl-frontend/pull/647) feat: [DC] #744 adds archived label to student ([@Wozniaxos](https://github.com/Wozniaxos))
* [#626](https://github.com/DefinedLearning/dl-frontend/pull/626) feat: [DC][PBL] shared Image component ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 4
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.20.0 Released (2021-11-22)

#### New Feature
* [#620](https://github.com/DefinedLearning/dl-frontend/pull/620) feat: [PBL] #740 filter algolia facets ([@Wozniaxos](https://github.com/Wozniaxos))
* [#618](https://github.com/DefinedLearning/dl-frontend/pull/618) feat: [DC][PBL] add thumbnails to all resources containing images ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))

## v1.19.0 Released (2021-11-18)

#### New Feature
* [#614](https://github.com/DefinedLearning/dl-frontend/pull/614) feat: [PBL] #732 adds algolia dynamic search key ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 2
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))

## v1.18.0 Released (2021-11-15)

#### Bug Fix
* [#580](https://github.com/DefinedLearning/dl-frontend/pull/580) fix: [DC] fix admin entities filtering ([@Wozniaxos](https://github.com/Wozniaxos))

#### Enhancement
* [#596](https://github.com/DefinedLearning/dl-frontend/pull/596) chore: upgrade input errors ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#601](https://github.com/DefinedLearning/dl-frontend/pull/601) feat: [DC] #730 implements plan report ([@Wozniaxos](https://github.com/Wozniaxos))
* [#587](https://github.com/DefinedLearning/dl-frontend/pull/587) feat: [DC] #723 implements csv courses report ([@Wozniaxos](https://github.com/Wozniaxos))
* [#576](https://github.com/DefinedLearning/dl-frontend/pull/576) feat: [DC] add checkin questions and gropus to admin panel ([@k1eu](https://github.com/k1eu))
* [#583](https://github.com/DefinedLearning/dl-frontend/pull/583) feat: [Shared][DC] implements shared dropdown ([@Wozniaxos](https://github.com/Wozniaxos))
* [#578](https://github.com/DefinedLearning/dl-frontend/pull/578) feat: [DC] implements role edition ([@Wozniaxos](https://github.com/Wozniaxos))
* [#581](https://github.com/DefinedLearning/dl-frontend/pull/581) feat: [DC] Redesign Student and Class Page ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#573](https://github.com/DefinedLearning/dl-frontend/pull/573) feat: [DC] Settings for teacher and entity admin ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 4
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.17.0 Released (2021-10-22)

#### New Feature
* [#563](https://github.com/DefinedLearning/dl-frontend/pull/563) feat: [DC} finish onboarding on action ([@Wozniaxos](https://github.com/Wozniaxos))
* [#560](https://github.com/DefinedLearning/dl-frontend/pull/560) feat: [DC] adds clear cache feature ([@Wozniaxos](https://github.com/Wozniaxos))
* [#556](https://github.com/DefinedLearning/dl-frontend/pull/556) feat: #707 [DC] adds thumbnail to course ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 4
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.16.0 Released (2021-10-07)

#### Bug Fix
* [#541](https://github.com/DefinedLearning/dl-frontend/pull/541) fix: [PBL] fix standards, groups and sets sorting ([@k1eu](https://github.com/k1eu))
* [#537](https://github.com/DefinedLearning/dl-frontend/pull/537) fix: [DC] SchoolClass students list ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#535](https://github.com/DefinedLearning/dl-frontend/pull/535) fix: fix impersonate and cypress auth bug ([@k1eu](https://github.com/k1eu))
* [#534](https://github.com/DefinedLearning/dl-frontend/pull/534) fix: add missing styles to portfolio tabs ([@k1eu](https://github.com/k1eu))
* [#527](https://github.com/DefinedLearning/dl-frontend/pull/527) fix: [DC] fix admin list scroll in every filter list ([@k1eu](https://github.com/k1eu))
* [#514](https://github.com/DefinedLearning/dl-frontend/pull/514) fix: [DC] fix entity info cache after update ([@k1eu](https://github.com/k1eu))
* [#525](https://github.com/DefinedLearning/dl-frontend/pull/525) fix: [DC] fix filtering list scroll after typing ([@k1eu](https://github.com/k1eu))
* [#512](https://github.com/DefinedLearning/dl-frontend/pull/512) chore: downgrade history package ([@k1eu](https://github.com/k1eu))

#### Enhancement
* [#522](https://github.com/DefinedLearning/dl-frontend/pull/522) chore: [DC][PBL][Shared] moves Buttons and LoadinSpinner to main shared ([@Wozniaxos](https://github.com/Wozniaxos))
* [#521](https://github.com/DefinedLearning/dl-frontend/pull/521) chore: [DC} adds TS to userInfo ([@Wozniaxos](https://github.com/Wozniaxos))
* [#515](https://github.com/DefinedLearning/dl-frontend/pull/515) chore: [DC][PBL] adds TS to authorization part ([@Wozniaxos](https://github.com/Wozniaxos))
* [#513](https://github.com/DefinedLearning/dl-frontend/pull/513) chore: adds useQueryParams hook ([@Wozniaxos](https://github.com/Wozniaxos))
* [#499](https://github.com/DefinedLearning/dl-frontend/pull/499) chore: typescript setup ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#536](https://github.com/DefinedLearning/dl-frontend/pull/536) feat: [PBL] implements algolia search ([@Wozniaxos](https://github.com/Wozniaxos))
* [#531](https://github.com/DefinedLearning/dl-frontend/pull/531) feat: [PBL] #680 add standards to project ([@k1eu](https://github.com/k1eu))
* [#526](https://github.com/DefinedLearning/dl-frontend/pull/526) feat: [PBL] #679 add tabs and products to user project view ([@k1eu](https://github.com/k1eu))
* [#507](https://github.com/DefinedLearning/dl-frontend/pull/507) feat: [DC] #672 Rubric assigning ([@k1eu](https://github.com/k1eu))

#### Committers: 5
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Natalia Witek ([@witeknatalia](https://github.com/witeknatalia))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.15.0 Released (2021-09-17)

#### Bug Fix
* [#491](https://github.com/DefinedLearning/dl-frontend/pull/491) fix: [PBL] #661 Change PBL logo ([@michalgren](https://github.com/michalgren))
* [#487](https://github.com/DefinedLearning/dl-frontend/pull/487) fix: [DC][PBL] #614 #641 #642 bug fixes ([@Wozniaxos](https://github.com/Wozniaxos))

#### Enhancement
* [#469](https://github.com/DefinedLearning/dl-frontend/pull/469) chore: Apply upgraded tooltip within app ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### New Feature
* [#497](https://github.com/DefinedLearning/dl-frontend/pull/497) feat: [DC] Grades ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#494](https://github.com/DefinedLearning/dl-frontend/pull/494) feat: [DC] #645 add rubrics copy ([@k1eu](https://github.com/k1eu))
* [#496](https://github.com/DefinedLearning/dl-frontend/pull/496) feat: [PBL] #663 add table of contents to course view ([@k1eu](https://github.com/k1eu))
* [#489](https://github.com/DefinedLearning/dl-frontend/pull/489) feat: [DC] #630 adds rubrics builder ([@k1eu](https://github.com/k1eu))
* [#486](https://github.com/DefinedLearning/dl-frontend/pull/486) feat: [DC] #649 adds stop impersonate on assessment and results ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 5
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
- Tomasz Kielar ([@k1eu](https://github.com/k1eu))
- [@michalgren](https://github.com/michalgren)

## v1.14.0 Released (2021-09-02)

#### New Feature
* [#472](https://github.com/DefinedLearning/dl-frontend/pull/472) feat: [DC] #636 adds demo filters and labels ([@Wozniaxos](https://github.com/Wozniaxos))
* [#460](https://github.com/DefinedLearning/dl-frontend/pull/460) feat: [DC] #607 Connected resources - preview option ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#464](https://github.com/DefinedLearning/dl-frontend/pull/464) feat: [DC] #631 Assign standard sets to entity ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#458](https://github.com/DefinedLearning/dl-frontend/pull/458) feat: [DC] #597 Custom projects with upload ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#456](https://github.com/DefinedLearning/dl-frontend/pull/456) feat: Foundational designator tooltips (#601) ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#455](https://github.com/DefinedLearning/dl-frontend/pull/455) feat: [DC] #627 Standard sets ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#457](https://github.com/DefinedLearning/dl-frontend/pull/457) feat: [DC] #609 adds impersonating feature ([@Wozniaxos](https://github.com/Wozniaxos))
* [#452](https://github.com/DefinedLearning/dl-frontend/pull/452) feat: [DC] #617 portfolio statement multiple comments ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#446](https://github.com/DefinedLearning/dl-frontend/pull/446) feat: [DC] #607 Affected resources list (edit/archive) ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#447](https://github.com/DefinedLearning/dl-frontend/pull/447) feat: [DC] #612 Update gradeSubmission mutation by lessonID ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#438](https://github.com/DefinedLearning/dl-frontend/pull/438) feat: [DC] #593 Resume upload ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

## v1.13.0 Released (2021-08-03)

#### New Feature
* [#441](https://github.com/DefinedLearning/dl-frontend/pull/441) feat: [DC] #601 Update Foundational Designator ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#401](https://github.com/DefinedLearning/dl-frontend/pull/401) feat: [DC] #533 Foundational Assessment ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#420](https://github.com/DefinedLearning/dl-frontend/pull/420) feat: [DC] #580 adds filters to contracts and reflect new API ([@Wozniaxos](https://github.com/Wozniaxos))
* [#425](https://github.com/DefinedLearning/dl-frontend/pull/425) feat: [DC] #579 adds products crud with task connection ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

## v1.12.0 Released (2021-07-12)

#### New Feature
* [#422](https://github.com/DefinedLearning/dl-frontend/pull/422) feat: [DC] #562 Foundational filter option for courses ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#418](https://github.com/DefinedLearning/dl-frontend/pull/418) feat: [PBL] #577 adds classroom share ([@Wozniaxos](https://github.com/Wozniaxos))
* [#415](https://github.com/DefinedLearning/dl-frontend/pull/415) feat: [DC] #571 Foundational Label ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#412](https://github.com/DefinedLearning/dl-frontend/pull/412) feat: [PBL] #561 Update Project Overview Card ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#408](https://github.com/DefinedLearning/dl-frontend/pull/408) feat: [PBL] #551 adds sharing ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

## v1.11.0 Released (2021-06-28)

#### Bug Fix
* [#370](https://github.com/DefinedLearning/dl-frontend/pull/370) fix: quick fix ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Enhancement
* [#389](https://github.com/DefinedLearning/dl-frontend/pull/389) feat: bump packages ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#402](https://github.com/DefinedLearning/dl-frontend/pull/402) feat: [PBL] #555 Task share resource code ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#393](https://github.com/DefinedLearning/dl-frontend/pull/393) feat: [PBL] #543 User Project Page ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#391](https://github.com/DefinedLearning/dl-frontend/pull/391) feat: [PBL] #542  Course page ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#390](https://github.com/DefinedLearning/dl-frontend/pull/390) feat: [DC] #546 adds missing attributes to PBL resources ([@Wozniaxos](https://github.com/Wozniaxos))
* [#386](https://github.com/DefinedLearning/dl-frontend/pull/386) feat: PBL-#541 PBL Dashboard ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#384](https://github.com/DefinedLearning/dl-frontend/pull/384) style: #544 PBL header and sidebar  ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#369](https://github.com/DefinedLearning/dl-frontend/pull/369) feat: #528 Foundational Settings (student & school-class) ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#373](https://github.com/DefinedLearning/dl-frontend/pull/373) fix: #523 Entity admin dashboard lists ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#356](https://github.com/DefinedLearning/dl-frontend/pull/356) feat: #511 Grading By Course ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#363](https://github.com/DefinedLearning/dl-frontend/pull/363) feat: #529 Tracking ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 4
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
- [@michalgren](https://github.com/michalgren)

## v1.10.0 Released (2021-06-10)

#### Bug Fix
* [#366](https://github.com/DefinedLearning/dl-frontend/pull/366) fix: #530 handle reauthentication ([@Wozniaxos](https://github.com/Wozniaxos))
* [#358](https://github.com/DefinedLearning/dl-frontend/pull/358) fix: fixes assessment result scrolling issue ([@Wozniaxos](https://github.com/Wozniaxos))
* [#351](https://github.com/DefinedLearning/dl-frontend/pull/351) fix: blue notifications ([@michalgren](https://github.com/michalgren))

#### New Feature
* [#360](https://github.com/DefinedLearning/dl-frontend/pull/360) feat: #520 implements foundational courses for admin ([@Wozniaxos](https://github.com/Wozniaxos))
* [#346](https://github.com/DefinedLearning/dl-frontend/pull/346) feat: 497 create tasks ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 5
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
- Natalia Witek ([@witeknatalia](https://github.com/witeknatalia))
- [@michalgren](https://github.com/michalgren)

## v1.9.0 Released (2021-05-19)

#### New Feature
* [#342](https://github.com/DefinedLearning/dl-frontend/pull/342) feat: #506 adds system admin view ([@Wozniaxos](https://github.com/Wozniaxos))
* [#337](https://github.com/DefinedLearning/dl-frontend/pull/337) feat: #499 adds advance admin course filter ([@Wozniaxos](https://github.com/Wozniaxos))
* [#336](https://github.com/DefinedLearning/dl-frontend/pull/336) feat: #476 Entity Admin Dashboard ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#338](https://github.com/DefinedLearning/dl-frontend/pull/338) Clickable activity log with course view ([@MarcinCholewka](https://github.com/MarcinCholewka))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

## v1.8.0 Released (2021-05-12)

#### Bug Fix
* [#334](https://github.com/DefinedLearning/dl-frontend/pull/334) fix: #485 use date util in entire app ([@Wozniaxos](https://github.com/Wozniaxos))
* [#335](https://github.com/DefinedLearning/dl-frontend/pull/335) fix: #498 unify lesson view for student and user ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#333](https://github.com/DefinedLearning/dl-frontend/pull/333) feat: #485 handle assessment failed status ([@Wozniaxos](https://github.com/Wozniaxos))
* [#331](https://github.com/DefinedLearning/dl-frontend/pull/331) feat: #468 allows to assign catalogs to entity ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
joannalenart@MacBook-Pro-Joanna dl-frontend %

## v1.7.0 Released (2021-04-28)

#### New Feature
* [#330](https://github.com/DefinedLearning/dl-frontend/pull/330) feat: #346 adds google analytics base setup ([@Wozniaxos](https://github.com/Wozniaxos))
* [#329](https://github.com/DefinedLearning/dl-frontend/pull/329) feat: #484 handle 7 study preferences ([@Wozniaxos](https://github.com/Wozniaxos))
* [#317](https://github.com/DefinedLearning/dl-frontend/pull/317) feat: #477 add polling ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 1
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))

## v1.6.0 Released (2021-04-21)

#### New Feature
* [#299](https://github.com/DefinedLearning/dl-frontend/pull/299) feat: #459 Teacher dashboard ([@Wozniaxos](https://github.com/Wozniaxos))
* [#303](https://github.com/DefinedLearning/dl-frontend/pull/303) feat: #466 allows to traverse entity in admin panel ([@Wozniaxos](https://github.com/Wozniaxos))
* [#304](https://github.com/DefinedLearning/dl-frontend/pull/304) feat: #463 Entity Filtering ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#297](https://github.com/DefinedLearning/dl-frontend/pull/297) feat: #454 [CorePBL] Filters ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#288](https://github.com/DefinedLearning/dl-frontend/pull/288) feat: #431 #441 core-pbl catalogs tracks and units CRUD ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#267](https://github.com/DefinedLearning/dl-frontend/pull/267) feat: #415 allow to set settings for entity (disabled/enabled onboarding/assessment) ([@Wozniaxos](https://github.com/Wozniaxos))
* [#283](https://github.com/DefinedLearning/dl-frontend/pull/283) feat: #437 course search text highlighting ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
## v1.5.0 Released (2021-03-17)

#### Bug Fix
* [#271](https://github.com/DefinedLearning/dl-frontend/pull/271) fix: #417 #418 Only Published Courses & Remove ScrollToTop With URLSearchParams ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#258](https://github.com/DefinedLearning/dl-frontend/pull/258) fix: #412 Change Login Page Heading ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#250](https://github.com/DefinedLearning/dl-frontend/pull/250) fix: #394 replace hardcoded admin lesson's course name ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Enhancement
* [#248](https://github.com/DefinedLearning/dl-frontend/pull/248) feat: #393 login texts change ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#278](https://github.com/DefinedLearning/dl-frontend/pull/278) feat: #435 updates filter for courses on user ([@Wozniaxos](https://github.com/Wozniaxos))
* [#269](https://github.com/DefinedLearning/dl-frontend/pull/269) feat: #387 Expose all 4 matching pathways right away (no click). ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#270](https://github.com/DefinedLearning/dl-frontend/pull/270) feat: #419 Remove Enrollment Option Button ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#257](https://github.com/DefinedLearning/dl-frontend/pull/257) feat: #395 implements plans evaluation ([@Wozniaxos](https://github.com/Wozniaxos))
* [#256](https://github.com/DefinedLearning/dl-frontend/pull/256) feat: #396 Google Picker ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#255](https://github.com/DefinedLearning/dl-frontend/pull/255) feat: #327 audio help widget readspeaker ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#249](https://github.com/DefinedLearning/dl-frontend/pull/249) feat: #386 Student Portfolio Projects ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#238](https://github.com/DefinedLearning/dl-frontend/pull/238) feat: #385 allows assign and unassign plan to entity ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

## v1.4.0 Released (2021-01-25)

#### Bug Fix
* [#240](https://github.com/DefinedLearning/dl-frontend/pull/240) fix: #378 class assignment mutations field name - schoolClassUuid ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#204](https://github.com/DefinedLearning/dl-frontend/pull/204) style: #340 Update Dashboard Courses Layout ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Enhancement
* [#209](https://github.com/DefinedLearning/dl-frontend/pull/209) style: #358 Unify modal close button appearance ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#211](https://github.com/DefinedLearning/dl-frontend/pull/211) style: #317 Sign-in short vendor text and hidden register link ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### New Feature
* [#239](https://github.com/DefinedLearning/dl-frontend/pull/239) feat: #319 LessonItem Presentation ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#234](https://github.com/DefinedLearning/dl-frontend/pull/234) feat: #368 Assign school class to course ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#227](https://github.com/DefinedLearning/dl-frontend/pull/227) feat: #377 implements readiness groups management ([@Wozniaxos](https://github.com/Wozniaxos))
* [#223](https://github.com/DefinedLearning/dl-frontend/pull/223) feat: #358 Course modal close button ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#221](https://github.com/DefinedLearning/dl-frontend/pull/221) feat: #360 allows printing final report to pdf ([@Wozniaxos](https://github.com/Wozniaxos))
* [#219](https://github.com/DefinedLearning/dl-frontend/pull/219) feat: #365 Announcements ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#217](https://github.com/DefinedLearning/dl-frontend/pull/217) feat: #362 implements unread status display ([@Wozniaxos](https://github.com/Wozniaxos))
* [#215](https://github.com/DefinedLearning/dl-frontend/pull/215) feat: #361 implements ask for guidance ([@Wozniaxos](https://github.com/Wozniaxos))
* [#213](https://github.com/DefinedLearning/dl-frontend/pull/213) feat: #329 #351 contextual messaging and student messages preview ([@Wozniaxos](https://github.com/Wozniaxos))
* [#196](https://github.com/DefinedLearning/dl-frontend/pull/196) feat: #341 Finished / In-progress assessment ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#208](https://github.com/DefinedLearning/dl-frontend/pull/208) style: #355 Implement dropdown on avatar with logout and admin panel ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#207](https://github.com/DefinedLearning/dl-frontend/pull/207) feat: #274 CourseCard Percentage Progress Text ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Committers: 4
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
- [@michalgren](https://github.com/michalgren)

## v1.3.0 Released (2021-01-25)

#### Bug Fix
* [#202](https://github.com/DefinedLearning/dl-frontend/pull/202) style: #339 rename assessment header title and centering step's instruction text ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#201](https://github.com/DefinedLearning/dl-frontend/pull/201) style: #339 assessment steps RWD ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#200](https://github.com/DefinedLearning/dl-frontend/pull/200) fix: #330 update user name and help text on login page ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#198](https://github.com/DefinedLearning/dl-frontend/pull/198) Css fixes v1 ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#192](https://github.com/DefinedLearning/dl-frontend/pull/192) fix: #337 update next lesson button ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### New Feature
* [#197](https://github.com/DefinedLearning/dl-frontend/pull/197) feat: #328 implements 1 to 1 messaging ([@Wozniaxos](https://github.com/Wozniaxos))
* [#194](https://github.com/DefinedLearning/dl-frontend/pull/194) feat #334 Change default avatar in header. ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#195](https://github.com/DefinedLearning/dl-frontend/pull/195) feat #335 Detach back button on lesson page from main body. Currently disappears when scrolling. ([@MarcinCholewka](https://github.com/MarcinCholewka))
* [#191](https://github.com/DefinedLearning/dl-frontend/pull/191) feat: #331 Tracking Final Report Update ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#189](https://github.com/DefinedLearning/dl-frontend/pull/189) feat: #313 course complete screen ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marcin Cholewka ([@MarcinCholewka](https://github.com/MarcinCholewka))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
## v1.2.0 Released (2021-01-11)

#### Bug Fix
* [#186](https://github.com/DefinedLearning/dl-frontend/pull/186) fix: #323 move refetch timeout on  assssment processing to env ([@Wozniaxos](https://github.com/Wozniaxos))
* [#183](https://github.com/DefinedLearning/dl-frontend/pull/183) fix: #289 interpolation special characters ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Enhancement
* [#167](https://github.com/DefinedLearning/dl-frontend/pull/167) test: #293 E2E setup ([@Wozniaxos](https://github.com/Wozniaxos))

#### New Feature
* [#187](https://github.com/DefinedLearning/dl-frontend/pull/187) feat: #309 split published and draft courses to sections ([@Wozniaxos](https://github.com/Wozniaxos))
* [#184](https://github.com/DefinedLearning/dl-frontend/pull/184) feat: #294 Assessment splash screen ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#182](https://github.com/DefinedLearning/dl-frontend/pull/182) feat: #303 implement user dashboard ([@Wozniaxos](https://github.com/Wozniaxos))
* [#172](https://github.com/DefinedLearning/dl-frontend/pull/172) feat: #298 overall status with real progress ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Committers: 2
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

## v1.1.0 Released (2020-12-11)

#### Enhancement
* [#168](https://github.com/DefinedLearning/dl-frontend/pull/168) feat: #296 move admin entities new/edit to new page ([@LukaszBielsko](https://github.com/LukaszBielsko))

#### New Feature
* [#171](https://github.com/DefinedLearning/dl-frontend/pull/171) feat: #288 add student notifications ([@Wozniaxos](https://github.com/Wozniaxos))
* [#169](https://github.com/DefinedLearning/dl-frontend/pull/169) feat: #287 course - table of content ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#166](https://github.com/DefinedLearning/dl-frontend/pull/166) feat: #117 add rubric ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#162](https://github.com/DefinedLearning/dl-frontend/pull/162) feat: #284 implement async assessment save ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
- Łukasz Walczak ([@LukaszBielsko](https://github.com/LukaszBielsko))

## v1.0.0 Released - (2020-11-30)

#### Bug Fix
* [#147](https://github.com/DefinedLearning/dl-frontend/pull/147) feat: #267 lesson next button with conditional text and redirect path ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Enhancement
* [#157](https://github.com/DefinedLearning/dl-frontend/pull/157) chore: #282 bump react ecosystem to 17 ([@Wozniaxos](https://github.com/Wozniaxos))
* [#156](https://github.com/DefinedLearning/dl-frontend/pull/156) feat: #283 hide unnecessary cards data ([@Wozniaxos](https://github.com/Wozniaxos))
* [#153](https://github.com/DefinedLearning/dl-frontend/pull/153) style: # 280 assessment result page rwd ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### New Feature
* [#155](https://github.com/DefinedLearning/dl-frontend/pull/155) feat: expose create, read and update metadata field for courses ([@LukaszBielsko](https://github.com/LukaszBielsko))
* [#154](https://github.com/DefinedLearning/dl-frontend/pull/154) feat: #277 add student items grading by teacher ([@Wozniaxos](https://github.com/Wozniaxos))
* [#146](https://github.com/DefinedLearning/dl-frontend/pull/146) feat: #266 implement final report ([@Wozniaxos](https://github.com/Wozniaxos))

#### Committers: 3
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
- Łukasz Walczak ([@LukaszBielsko](https://github.com/LukaszBielsko))

## v0.9.0 Released - (2020-11-19)

#### Enhancement
* [#144](https://github.com/DefinedLearning/dl-frontend/pull/144) chore: remove progress from recommended ([@Wozniaxos](https://github.com/Wozniaxos))
* [#143](https://github.com/DefinedLearning/dl-frontend/pull/143) chore: adjust to  new attempt return from BE ([@Wozniaxos](https://github.com/Wozniaxos))
* [#141](https://github.com/DefinedLearning/dl-frontend/pull/141) Adding ul styles and fix modal height ([@michalgren](https://github.com/michalgren))
* [#137](https://github.com/DefinedLearning/dl-frontend/pull/137) hiding non functional areas for release ([@LukaszBielsko](https://github.com/LukaszBielsko))

#### New Feature
* [#142](https://github.com/DefinedLearning/dl-frontend/pull/142) fix: possible to skip assessment step 2 question ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
* [#139](https://github.com/DefinedLearning/dl-frontend/pull/139) feat: #250 add next lesson button ([@Wozniaxos](https://github.com/Wozniaxos))
* [#140](https://github.com/DefinedLearning/dl-frontend/pull/140) feat: add logout / back to dashboard button ([@LukaszBielsko](https://github.com/LukaszBielsko))
* [#134](https://github.com/DefinedLearning/dl-frontend/pull/134) feat: #240 student view for teacher ([@Wozniaxos](https://github.com/Wozniaxos))
* [#135](https://github.com/DefinedLearning/dl-frontend/pull/135) feat: #258 add logout option during onboarding assessment ([@LukaszBielsko](https://github.com/LukaszBielsko))
* [#132](https://github.com/DefinedLearning/dl-frontend/pull/132) feat: #237 implement tracking student activity ([@Wozniaxos](https://github.com/Wozniaxos))
* [#136](https://github.com/DefinedLearning/dl-frontend/pull/136) feat: #239 Assessment Result Components ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))

#### Committers: 4
- Kacper Woźniak ([@Wozniaxos](https://github.com/Wozniaxos))
- Marek Kazimierczak ([@Marek-Kazimierczak](https://github.com/Marek-Kazimierczak))
- [@michalgren](https://github.com/michalgren)
- Łukasz Walczak ([@LukaszBielsko](https://github.com/LukaszBielsko))
