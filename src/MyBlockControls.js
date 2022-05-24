import { __ } from '@wordpress/i18n';
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import PlayIcon from './icon-play.js';

export default function MyBlockControls( {
	attributes,
	selectedSlide,
	handleOnSelectSlideMedia,
} ) {
	return (
		<BlockControls
			controls={ [
				{
					icon: PlayIcon,
					title: __( 'Shadow', 'aaa' ),
					onClick: () => {},
					isActive: false,
				},
			] }
		>
			{ Number.isInteger( selectedSlide ) && (
				<MediaReplaceFlow
					name={ __( 'Replace Image', 'team-members' ) }
					onSelect={ ( media ) =>
						handleOnSelectSlideMedia( media, selectedSlide )
					}
					//onSelectURL={ onSelectURL }
					onError={ () =>
						alert( __( 'oops, something went wrong', 'aaa' ) )
					}
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					// mediaId={ id }
					// mediaURL={ url }
				/>
			) }
		</BlockControls>
	);
}
