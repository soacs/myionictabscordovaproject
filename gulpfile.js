var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('gulp-run-sequence');
var exec = require('child_process').exec;
var requireDir = require('require-dir');
//var mail = require('gulp-mail');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var mailing = require('gulp-mailing');
requireDir('./gulp/tasks', {recurse: true});

gulp.task('ionic_cordova_platforms_ls', function (cb) {
  exec('ionic cordova platforms ls', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('ionic_cordova_build_browser', function (cb) {
  exec('ionic cordova build browser', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_run_browser', function (cb) {
  exec('ionic cordova run browser', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_build_andriod', function (cb) {
  exec('ionic cordova build android', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_build_andriod_release', function (cb) {
  exec('ionic cordova build android --release', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('distribute', function (cb) {
  exec('aws s3 cp platforms\\android\\app\\build\\outputs\\apk\\release\\app-release.apk s3://aws-website-angularorange-wcrwx/ ', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('distribute_from_toplevel', function (cb) {
  exec('aws s3 cp app-debug.apk s3://aws-website-angularorange-wcrwx/ ', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('deploy', function (cb) {
  runSequence('ionic_cordova_build_andriod_release', 'distribute', cb);
});
gulp.task('emulate', function (cb) {
  runSequence('ionic_cordova_build_andriod', 'ionic_cordova_emulate_android', cb);
});
gulp.task('ionic_cordova_build_android', function (cb) {
  exec('ionic cordova build android', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_emulate_android', function (cb) {
  exec('ionic cordova emulate android', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_requirements', function (cb) {
  exec('ionic cordova requirements', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_platform_add_ios', function (cb) {
  exec('ionic cordova platform add ios', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_platform_add_browser', function (cb) {
  exec('ionic cordova platform add browser', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_platform_rm_browser', function (cb) {
  exec('ionic cordova platform rm browser', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_build_browser', function (cb) {
  exec('ionic cordova build browser', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_run_browser', function (cb) {
  exec('ionic cordova run browser', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_cordova_platform_rm_ios', function (cb) {
  exec('ionic platform rm ios', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_help', function (cb) {
  exec('ionic --help', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic_serve', function (cb) {
  exec('ionic serve', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
gulp.task('ionic:watch:before', ['watch'])

var smtpInfo = {
  auth: {
    user: "AKIAJCGHN4IHSWATXMCA",
    pass: "AjAiFzGqtjC9L4JwZ3Vr2REEfd20lsXuxvAKbTrAyB/p"
  },
  host: "email-smtp.us-east-1.amazonaws.com",
  secureConnection: false,
  port: 587
};

gulp.task('email_distribution', function () {
  return gulp.src('./mymailmessage.html')
    .pipe(mail({
      subject: 'Mobile App Version 2.0 Distribution',
      to: [
        'steve@soaconsultingservices.com'
      ],
      from: 'steve@soaconsultingservices.com',
      smtp: smtpInfo
    }));
});


var smtpInfoMochahost = {
  auth: {
    user: "dncnw0kt",
    pass: "timber91"
  },
  host: "mail.soaconsultingservices.com",
  secureConnection: true,
  port: 2525
};
gulp.task('email_attachment', function () {
  return gulp.src('./mymailmessage.html')
    .pipe(mailing({
      subject: 'Mobile App Version 2.0 Now Available ',
      to: [
        'steve@soaconsultingservices.com'
      ],
      from: 'steve@soaconsultingservices.com',
      attachments: [
        {
          path: 'app-release.apk'
        }
        ],
    smtp: smtpInfo
    }));
});