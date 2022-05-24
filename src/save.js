import { __ } from '@wordpress/i18n';

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( props ) {
	console.log( 'save p', props );

	return (
		<section
			{ ...useBlockProps.save( {} ) }
			aria-label="Splide Basic HTML Example"
		>
			<div className="splide">
				<div className="splide__track">
					<ul className="splide__list">
						{ props.attributes.slides_media_array.map(
							( mediaObj, i ) => {
								return (
									<li
										className="splide__slide"
										key={ `slide-${ i }` }
									>
										<picture>
											<img
												src={ mediaObj.url }
												alt="slide"
											/>
										</picture>
										<div className="description">
											{
												<RichText.Content
													tagName="h2"
													value={
														props.attributes
															.slides_descriptions_array[
															i
														]
													}
												/>
											}
										</div>
									</li>
								);
							}
						) }
					</ul>
				</div>
			</div>
		</section>
	);
}
