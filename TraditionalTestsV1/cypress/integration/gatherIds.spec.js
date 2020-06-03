import buildViews from '../fixtures/buildViews';

it('builds views with visible and invisible ids', () => {
	const url = '/gridHackathonV1.html';
	buildViews(url).then(views=> {
		views.forEach(view => {
			expect(view.showIds).greaterThan(0);
		})
	});


})
