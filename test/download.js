var test = require('tape');
var sinon = require('sinon');
var Q = require('q');
var _ = require('underscore');

var download = require('../lib/commands/download');
var clone = require('../lib/utils/clone');

var resolvedPromise = Q.fcall({});

test('download to destination', function(t) {
	t.plan(2);
	sinon.stub(download, 'getProjectById', _.constant(Q.fcall({})));
	sinon.stub(download, 'getProjectTitle', _.constant(resolvedPromise));
	sinon.stub(download, 'getProjectFiles', _.constant(resolvedPromise));
	var cloneSpy = sinon.spy(clone);

	download('a file id', 'path/to/dest')
		.then(function() {
			t.ok(cloneSpy.called, 'cloned');
			t.ok(cloneSpy.calledWith('a file id', 'path/to/dest'), 'cloned to destination');
		});
});
