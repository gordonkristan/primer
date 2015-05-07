(function() {
	'use strict';

	var OriginalDate = Date;

	var within = function(a, b, tolerance) {
		return (Math.abs(a - b) <= tolerance);
	};

	module('Primer.js Tests', {
		setup: function() {
			Date.enablePrimer();
				Date.resetTime();
		},

		teardown: function() {
			Date.disablePrimer();
		}
	});

	test('The library has no effect by default', function() {
		expect(2);

		Date.disablePrimer();
		strictEqual(Date, OriginalDate);
		Date.enablePrimer();
		ok(Date !== OriginalDate);
	});

	test('`resetTime` works properly', function() {
		expect(2);

		var now = new Date().getTime();
		
		Date.setTime(now - 5*60*60*1000);
		ok(!within(now, new Date().getTime(), 5));

		Date.resetTime();
		ok(within(now, new Date().getTime(), 5));
	});

	test('The custom constructor works properly', function() {
		expect(9);

		ok(new Date().getTime() === new OriginalDate().getTime());
		ok(new Date(1128142800000).getTime() === 1128142800000);
		ok(new Date('January 24, 2012 00:00:00').getTime() === new OriginalDate('January 24, 2012 00:00:00').getTime());
		ok(new Date(2004, 1).getTime() === new OriginalDate(2004, 1).getTime());
		ok(new Date(1999, 1, 1).getTime() === new OriginalDate(1999, 1, 1).getTime());
		ok(new Date(1999, 1, 1, 3).getTime() === new OriginalDate(1999, 1, 1, 3).getTime());
		ok(new Date(1999, 1, 1, 3, 24).getTime() === new OriginalDate(1999, 1, 1, 3, 24).getTime());
		ok(new Date(1999, 1, 1, 3, 24, 59).getTime() === new OriginalDate(1999, 1, 1, 3, 24, 59).getTime());
		ok(new Date(1999, 1, 1, 3, 24, 59, 999).getTime() === new OriginalDate(1999, 1, 1, 3, 24, 59, 999).getTime());
	});

	test('Using the constructor incorrectly throws', function() {
		expect(1);

		throws(function() {
			new Date(1,1,1,1,1,1,1,1,1,1,1,1);
		});
	});

	test('Setting the date absolutely returns it properly', function() {
		expect(2);

		var then = new Date('December 25, 2000 01:23:45').getTime();
		Date.setTime(then);
		ok(within(then, Date.now(), 5));
		Date.setTime(then);
		ok(within(then, new Date().getTime(), 5));
	});

	test('The `setTime` function works with different types of inputs', function() {
		expect(3);

		var dateString = 'December 25, 2000 01:23:45';
		var date = new Date(dateString);
		var timestamp = date.getTime();

		Date.setTime(dateString);
		ok(within(timestamp, Date.now(), 5));
		
		Date.setTime(date);
		ok(within(timestamp, Date.now(), 5));

		Date.setTime(timestamp);
		ok(within(timestamp, Date.now(), 5));
	});

	test('Using `setTime` with a bad type throws', function() {
		expect(3);

		throws(function() {
			Date.setTime();
		});

		throws(function() {
			Date.setTime(null);
		});

		throws(function() {
			Date.setTime(true);
		});
	});

	test('Setting the date relatively returns it properly', function() {
		expect(2);

		var diff = -5*60*1000;

		Date.setTime(diff, true);
		ok(within(new OriginalDate().getTime() + diff, Date.now(), 5));
		Date.setTime(diff, true);
		ok(within(new OriginalDate().getTime() + diff, new Date().getTime(), 5));
	});
})();
