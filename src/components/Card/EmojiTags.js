import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

class EmojiTags extends Component {

    state = {
        emojis: this.props.emojis
    }

    render() {
        const { emojis } = this.state;
        return(
            <div>
                {emojis.map(function (emoji, i) {

                    let emojiConfig;

                    if (emoji.skin) {
                        emojiConfig = ':' + emoji.id + '::skin-tone-' + emoji.skin + ':';
                    } else {
                        emojiConfig = emoji.id
                    }

                    return (
                        <span style={{marginLeft: '5px'}}>
                        <Emoji set="twitter" emoji={emojiConfig} size={30} />
                        </span>
                    )
                })}
            </div>
        )
    }
}

export default EmojiTags;