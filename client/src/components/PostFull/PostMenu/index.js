import React, { Component } from 'react';
import AvatarSidebar from '../../AvatarSidebar';
import ReblogButton from '../../ReblogButton';
import LikeButton from '../../LikeButton';

class PostMenu extends Component {

    render () {
        return (
            <div>
                <AvatarSidebar/>
                <ReblogButton/>
                <LikeButton/>
            </div>
        )
    }

}

export default PostMenu;