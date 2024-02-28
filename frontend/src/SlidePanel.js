import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import SlidePanelTabs from "./SlidePanelTabs";
import './SlidePanel.css';
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidePanel = () => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);

    return (
        <div>
            {!isPaneOpen && (
                <button className='sidebar-toggle' onClick={() => setIsPaneOpen(true)}>
                    <span>>></span>
                </button>
            )}
            <SlidingPane
                closeIcon={<div>X</div>}
                isOpen={isPaneOpen}
                title="OSD Modeling"
                from="left"
                width="24em"
                onRequestClose={() => setIsPaneOpen(false)}>
                <SlidePanelTabs />
            </SlidingPane>
        </div>
    );
};

export default SlidePanel;
