import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	MediaPlaceholder,
	RichText,
} from '@wordpress/block-editor';
// import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

import './editor.scss';
import MyBlockControls from './MyBlockControls';

export default function Edit( props ) {
	// Params
	const { attributes } = props;

	// State
	const [ slideSelected, setSlideSelected ] = useState( false );

	//console.log( 'attributes', attributes );
	// HANDLES
	function handleOnSelectSlideMedia( mediaAttrs, i = null ) {
		// console.log( 'sel', e, i );
		const currentMediaArray = [ ...attributes.slides_media_array ];
		const currentIndexSlide = i === null ? slideSelected : i;

		if ( ! Number.isInteger( currentIndexSlide ) ) return;
		// insert at 'i' position
		const newMediaItem = { id: mediaAttrs.id, url: mediaAttrs.url };
		currentMediaArray[ currentIndexSlide ] = newMediaItem;
		props.setAttributes( { slides_media_array: currentMediaArray } );
	}
	function handleChangeDescription( newDescription ) {
		// console.log( 'sel', e, i );
		const currentDescriptions = [ ...attributes.slides_descriptions_array ];

		if ( ! Number.isInteger( slideSelected ) ) return;
		// insert at 'i' position
		currentDescriptions[ slideSelected ] = newDescription;
		props.setAttributes( {
			slides_descriptions_array: currentDescriptions,
		} );
	}
	function handleAddSlide( e ) {
		e.preventDefault();

		console.log( attributes );

		const totalSlides = attributes.slides_number + 1;

		// the new slide doesnt have media nor descr. Initialized with empty strings
		const currentMediaArray = [ ...attributes.slides_media_array ];
		const currentDescriptions = [ ...attributes.slides_descriptions_array ];
		currentMediaArray[ totalSlides - 1 ] = null;
		currentDescriptions[ totalSlides - 1 ] = 'New Slide';
		// update model.
		props.setAttributes( {
			slides_number: totalSlides,
			slides_media_array: currentMediaArray,
			slides_descriptions_array: currentDescriptions,
		} );
	}
	function deleteSlide( e, i ) {
		const totalSlides = attributes.slides_number - 1;

		// remove item i from array slides_media_array
		const currentMediaArray = attributes.slides_media_array.filter(
			( item, index ) => index !== i
		);
		const currentDescriptions = attributes.slides_descriptions_array.filter(
			( item, index ) => index !== i
		);

		//update attrs
		props.setAttributes( {
			slides_number: totalSlides,
			slides_media_array: currentMediaArray,
			slides_descriptions_array: currentDescriptions,
		} );
	}
	// ---------------------------------------------------
	return (
		<div { ...useBlockProps() }>
			<MyBlockControls
				attributes={ attributes }
				slideSelected={ slideSelected }
				handleOnSelectSlideMedia={ handleOnSelectSlideMedia }
			/>
			<div className="slides-parent">
				{ attributes.slides_number ? (
					<>
						{ Array( attributes.slides_number )
							.fill( '' )
							.map( ( idle, i ) => (
								// eslint-disable-next-line
								<div
									className={ `slide slide-item-${ i } ${
										slideSelected === i && 'slide-selected'
									} ` }
									onClick={ () => setSlideSelected( i ) }
									onKeyDown={ () => setSlideSelected( i ) }
									role="contentinfo"
									key={ `el-${ i }` }
									style={ { background: 'gray' } }
								>
									<span className="slide-badge">
										{ __( 'Slide', 'aaa' ) } #{ i }
									</span>
									<span
										className="slide-badge delete-slide"
										onClick={ ( e ) => deleteSlide( e, i ) }
									>
										❌
									</span>
									{ attributes.slides_media_array[ i ]
										?.url ? (
										<img
											alt="slide"
											src={
												attributes.slides_media_array[
													i
												].url
											}
										/>
									) : (
										<MediaPlaceholder
											icon="admin-users"
											onSelect={ ( media ) =>
												handleOnSelectSlideMedia(
													media,
													i
												)
											}
											//onSelectURL={ onSelectURL }
											//onError={ onUploadError }
											accept="image/*"
											allowedTypes={ [ 'image' ] }
											disableMediaButtons={ false }
											notices={ props.noticeUI }
										/>
									) }
									<div className="slide-descr">
										<RichText
											tagName="h2"
											className="slide-title"
											placeholder="title here"
											value={
												attributes
													.slides_descriptions_array[
													i
												] ?? ''
											}
											onChange={ handleChangeDescription }
										/>
									</div>
									{ /* end slide */ }
								</div>
							) ) }
					</>
				) : (
					<div>No slides yet</div>
				) }
				<div className="slide slide-add-button">
					<button className="add-slide" onClick={ handleAddSlide }>
						{ __( 'Add Slide', 'aaa' ) } 💁
					</button>
				</div>

				{ /* slides-parent */ }
			</div>
		</div>
	);
}
