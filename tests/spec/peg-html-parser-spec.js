describe('html parser', function () {

	var html;
	var parser = function () {
		return HTMLParser.parse(html);
	}

	afterEach(function () {
		html = '';
	});

	describe("should be able to", function() {

		it("should be able to parse HTML with a doctype", function() {

			html = document.getElementById('basic-one-line-with-doctype').innerHTML;
			expect(parser).not.toThrow();

		});

		it("should be able to parse valid HTML over one line", function() {

			html = document.getElementById('basic-one-line-without-doctype').innerHTML;
			expect(parser).not.toThrow();

		});

		it("should be able to parse HTML over multiple lines", function() {

			html = document.getElementById('basic-over-multiple-lines').innerHTML;
			expect(parser).not.toThrow();

		});

	});

	describe("should not be able to", function() {

		it("parse non-valid HTML", function() {

			html = '<html><head></head><html>';
			expect(parser).toThrow();

		});

	});

});