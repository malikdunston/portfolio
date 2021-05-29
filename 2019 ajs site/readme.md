May 2:

	-	between Mar 18 and now:
		-	Added /apps
		-	Home = Work
		-	Child Projects

Mar 19: - Entire site done.

Mar 18:

	-	casestudy ui-view article problem
	-	skills-tools, about padding
	-	content all pages spellchecked

Mar 17:

	-	Skills page.
		-	WP Pages
	-	app.navOpen instead of menuOpen

Mar 16: - updating some things from Mar 11 +

	-	fixed contact nav
	-	typography
	-	all nine boxes on homepage.
	-	casestudy.. scroll to bottom.
		-	proj on casestudy pg
	-	projects.onhover, projects.offhover replaces and opens ticker.

Mar 14: - BrightWave interview is tomorrow.

	-	nav still gets wide.
	-	spellcheck every page.
	-	keep pills open on case study

Mar 13: - Finalizing.

	-	/contact
		-	nav gets too wide. think its a js issue.

Mar 11: - Finalizing.

	-	Contact
	-	fill out rest
	-	add pill buttons to case study
	-	add projects to bottom of case study

Mar 10: - MVP - past deadline.

	-	nav circle
	-	about bio.
	-	maxx changes

Mar 8: Polishing & Initial deploy.

	-	site deployed. Still need to work on:
		-	conditional "Hello" in case study.
		-	About: side-by-side and also ajs powered on about page.
		-	Browser compatability (ie and safari)
	-	.peeked, .hidden on contact-form, based on projects.onHover.offHover.projClick.
	-	base on window scroll position.
		-	measure window position at all times.
			-	write code for case-study, or any page not home/contact?
			-	change bg-image position based on window scroll.

Mar 7: Internet is out

	-	working on hendricks casue I can offline.
	-	homepage is where I want it now.

Mar 6: Desktop styles...

	-	had to talk to brian yesterday.
	-	projClick for mobile...
	-	need to change after 1000px?
		-	Most directors, dig folks will be looking from a > 1300ish desktop.
		
		

Mar 5: Case Studies Cont...

	-	done with mobile.
	-	Done with conact mobile
	-	ng-option for:
		-	resume req?
	-	Need to style up inside.
		-	Contact
			-	logo is now an svg with fill attribute changes based on route.
		-	Done
		-	Moving to homepage.
			-	hide contact on about, probably x height on projects too?
			- bg image stuff done


Mar 4: - Case Studies

	-	styled up inside page is done.
		-	Now I need to do About.
		-	figure out toggle on page transition.
			-	done at 7pm.
	-	accidentally dumped this site into hendricks on ftp.

Mar 3: - Finishing up from Mar 2..

	-	Backend is finished. Happy with progress so far.
		-	Want to make homepage pixel perfect now.
		-	Haven't thought about desktop.
	-	ACF: need to categorize.
	-	Form issue coming up blank now.
		-	fixed. crdunsto_forms with an s.
	-	12 noon I am about 1/3 along the way time-wise.
		-	 Wana have MVP by 12th.
	-	file structure is looking beautiful rn.

Mar 2: - CMS, Custom Post Types,

	-	Even easier way to do below bullet, with this: https://github.com/airesvsg/acf-to-rest-api/ it adds to the response....
	-	Entire site connected. Can get rid of projects.info, projects.site.
		-	http://blog.malikdunston.com/wp-json/acf/v3/projects/
		-	Found out how 
	-	starting on projects and case-studies.
	-	blog.malikdunston.com, http calls from, wp media.
	-	gonna fill inside pages with content like hend,
		-	media (included in content.rendered, but wrapped with a bunch of stuff.)

Mar 1: - Finished with Nav

	-	break, then:
		-	Call to blog from dev site, then upload dev site to Gator.
	-	blog.malikdunston.com
		-	postman folder created for types, etc.
		-	max upload size is 64MB!!!!!!
	-	Lets get started with wordpress then.
		-	wamp, etc.
	-	links, ng-repeat, animation, peek/open classes on nav/body, respectively.
		-	if body is open, then nav.peeked!!!!!!

Feb 28: - Building from Inside-Out

	-	Working on Nav now.
	-	Sass-ready. Color palate is nice... mix of primary-secondary, rgb/cmy, with white/black and off-white/black. + Gotham. Logical, clean, pretty, strong, etc.
	-	Work on setinterval to switch out title/sub.. then 
		-	Start on Sass
	-	submit.php, contact.js, phpMyAdmin
		-	definitely want to just collect, and not send an automated email; they end up in spam folder, not enough time to figure out how to not do that.
		-	https://stackoverflow.com/questions/23716187/how-does-mysqli-connect-work-in-php
	-	Then crack the nav.
		-	The automation stuff should be under appCtrl, not navCtrl.

Feb 27: - Plans Made

	-	Basically wanna use the wp site as a picture repo also.
		-	maybe each image has properties:
			-	tools used, skills used
			-	when, for whom (null)
			-	project/for whom
			-	caption
		-	all the above stuff can be mapped to a resume!
	-	Going to be in Ruleville most of day.
	-	Need to:
		1	make this consistent with "site_cec..." site.
			-	In doing this (11:56pm), I found:
				-	copies of img folder (root, and assets)
				-	copies of styles folder (root, and assets)
				-	don't wanna worry about Gulp.js rn.
				-	deleted 3GB outernets stuff, it is in pics/des/proj
		2	send content to wp.
		-	once these two are done, add content.
			-	competitive analysis, etc.
			-	complete audit of my portfolio on:
				-	machine
				-	gdrive
				-	outlook, gmail attachments


Feb 26: - Concepting, Ideas, General

	-	Gonna take this plus the best stuff from Hendricks, but no wordpress.
	-	Goal is to have a framework that can post data within two weeks.
		-	Then one week on purely design stuff.
	-	SWOT analysis of myself, other sites in chrome bookmarks, ppl I know, in folks, SU folks, etc.
	-	Make a few personas based on people I have tried to network with.
	-	definite, concrete needs include:
		-	skills
		-	tools
		-	projects (and corresponding skills/tools)
		-	about (consistent descriptions, pictures across social.)
	-	I have a lot of notes. I need to refine/reconcile these to the code I have written, which itself must be slimmed down/ re-understood, then match these two things.