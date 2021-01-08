$(document).ready(function() {

	$('.play').on('click', function app() {
		cards = ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'four', 'five', 'five', 'six', 'six', 'seven', 'seven', 'eight', 'eight'],
			$('.card').each(function() {
				$(this).removeClass('correct').removeClass('selected').addClass('unmatched').addClass('back');
			})
		$('.game').removeClass('hidden');
		$('.win').addClass('hidden');
		$('.lose').addClass('hidden');
		$('.play').text('Reset');

		var lives = 3;
		$('.lives').text(lives);


		shuffle();

		function shuffle() {
			var random = 0;
			var temp = 0;
			for (i = 1; i < cards.length; i++) {
				random = Math.round(Math.random() * i);
				temp = cards[i];
				cards[i] = cards[random];
				cards[random] = temp;
			}
			assign();
		}

		function assign() {
			$('.unmatched').each(function(index) {
				// change this to image rather that html
				$(this).attr('id', cards[index]).removeClass('back').addClass('front');

			});
			setTimeout(function() {
				$('.unmatched').each(function() {
					$(this).html('').addClass('back').removeClass('front');
				});
			}, 10000);

			flipCard();
		}

		function flipCard() {
			$('.unmatched:not(.correct)').on('click', function() {
				if (lives !== 0 && $('.selected').length !== 2) {
					$(this).not('.correct').addClass('selected').addClass('front').removeClass('back').removeClass('unmatched');
					checkMatch();
				}
			});
		}

		function checkMatch() {
			if ($('.selected').length === 2) {
				if ($('.selected').first().attr('id') == $('.selected').last().attr('id')) {
					$('.selected').each(function() {
						$(this).addClass('correct');
					});
					$('.correct').each(function() {
						$(this).removeClass('back').removeClass('unmatched').removeClass('selected').addClass('front');
					});

					checkWin();
				} else {
					loseLife();
					checkFail();
					setTimeout(function() {
						// remove html once id finished
						$('.selected').each(function() {
							$(this).html('').removeClass('selected').removeClass('front').addClass('unmatched').addClass('back');
						});
					}, 1000);
					checkWin();
				}
			}
		}

		function loseLife() {
			lives = lives - 1;
			$('.lives').text(lives);
		}

		function checkWin() {
			if ($('.unmatched').length === 0) {
				$('.win').removeClass('hidden');
				$('.play').text('Play again');
				lives = 3;
			}
		}

		function checkFail() {
			if (lives === 0) {
				$('.lose').removeClass('hidden');
				$('.play').text('Play again');
				$('.card').each(function() {
					$(this).addClass('front').removeClass('selected').removeClass('back');
				});
				lives = 3;
			}
		}
	});
});