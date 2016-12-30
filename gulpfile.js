/**
 * replace
 * 2016 © toxichl
 * MIT lisence
 * A ionic switch
 */

const gulp        = require( 'gulp' ),
      runSequence = require( 'run-sequence' ),
      fs          = require( 'fs' ),
      path        = require( 'path' ),
      del         = require( 'del'),
      events      = require( 'events');

// path of the JSON config
const configPath = 'replace.config/config.json';
var PATH,
    logString = '# Replace Log\n **Create Time**: ' + (new Date()).toLocaleString() + '<br>',
    logStream = fs.createWriteStream('replace.config/log/record_' +
        ((new Date()).toDateString() + '_'+
        (new Date()).toTimeString()).replace(/:/g, '_') + '.md'),
    emitter = new events.EventEmitter(),
    type;

// get the json
gulp.task('getJSON',function ( cb ) {
    logString += '\nstatus|description\n---|---\n'
    logString += 'start|getJSON\n';
    var config = fs.readFileSync(configPath, 'utf-8');
    PATH = JSON.parse(config).path;
    logString += 'finish|getJSON\n';
    cb && cb();
})

// clean the target path files
gulp.task('mapJSON', function (cb) {
  var delArray = [];
  logString += 'start|mapJSON\n';
  for(var i = 0, l = PATH.length; i < l; i++){
    logString += 'file[' + [i] +']|';
    logString += '**source**:\t\t' +
        (type === 'replace' ? PATH[i].source : type === 'resume' ? PATH[i].target_bak : '?') + '<br>';
    logString += '**target**:\t\t' + PATH[i].target + '\n';
    if( i == l - 1){
      logString += 'finish|mapJSON\n';
    }
    delArray.push( PATH[i].target )
  }
  logString += 'delete|target files\n';
  return del(delArray, cb);
});

// replace files
gulp.task('replaceTarget', function ( cb ) {
  logString += 'start|replace\n';
  var count = 0;
  for(let i = 0, l = PATH.length; i < l; i++){
    gulp.src( PATH[i].source )
      .pipe( gulp.dest( path.dirname(PATH[i].target)) )
      .on('end', function (){
        count ++;
        logString += 'finish|' + 'replace [file'+ i +']' + '\n';
        if( count === l ){
          logString += 'finish|replace' + '\n';
          emitter.emit('FINISH');
          cb();
        }
      })
  }
})

// replace files
gulp.task('resumeTarget', function ( cb ) {
  logString += 'start|resume\n';
  for(let i = 0, l = PATH.length; i < l; i++){
    gulp.src( PATH[i].target_bak )
      .pipe( gulp.dest( path.dirname(PATH[i].target)) )
      .on('end', function () {
        logString += 'finish|' + 'resume [file'+ i +']' + '\n';
        if( i == l - 1){
          logString += 'finish|resume' + '\n';
          emitter.emit('FINISH');
          cb();
        }
      })
  }
})

emitter.on('FINISH', function () {
  logString += 'finish|ALL' + '\n';
  logStream.write(logString, 'utf-8')
})

// replace task
gulp.task( 'replace', function (cb) {
  logString += 'Type: replace\n';
  type = 'replace';
  runSequence('getJSON', 'mapJSON', 'replaceTarget', cb)
});

// resume task
gulp.task( 'resume', function (cb) {
  logString += '**Type**: resume\n';
  type = 'resume';
  runSequence('getJSON', 'mapJSON', 'resumeTarget', cb)
});

// default task
gulp.task( 'default', ['replace']);



