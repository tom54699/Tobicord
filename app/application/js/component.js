const windowFrame = (windowId, windowNum) => {
    return `                                
    <div class="rightSection-spaces-window-tabs-box">
        <div class="rightSection-spaces-window-tabs-container-close-container" id="windowTabsCloseContainer-${windowId}">
            <span class="rightSection-spaces-window-tabs-container-close-title"
                >Are you sure you want to close this window?</span
            >
            <div
                class="rightSection-spaces-window-tabs-container-close-button-container"
            >
                <button class="rightSection-spaces-window-tabs-container-return-button"  id="windowTabsReturnContainerButton-${windowId}">
                    <span class="rightSection-spaces-window-tabs-container-return-text"
                        >Cancel</span
                    >
                </button>
                <button class="rightSection-spaces-window-tabs-container-close-button" id="windowTabsCloseContainerButton-${windowId}">
                    <span class="rightSection-spaces-window-tabs-container-close-text"
                        >Yes, Close</span
                    >
                </button>
            </div>
        </div>
        <div class="rightSection-spaces-window-tabs-line">
            <div class="rightSection-spaces-window-tabs-left-block">
                <span class="rightSection-spaces-window-title">Window ${windowNum + 1}</span>
                <button
                    class="rightSection-spaces-window-fold-button"
                    tabindex="-1"
                    data-bs-toggle="collapse"
                    data-bs-target="#window_${windowId}"
                    aria-expanded="false"
                    aria-controls="window_${windowId}"
                >
                    <div class="arrow-right-svg"></div>
                    <div class="rightSection-spaces-window-arrow-down-svg"></div>
                </button>
            </div>
            <div class="rightSection-spaces-window-tabs-right-block">
                <div>
                    <span class="rightSection-spaces-window-tabs-download-container">
                        <button class="rightSection-spaces-window-tabs-download-button">
                            <div
                                class="rightSection-spaces-window-tabs-download-svg"
                            ></div>
                            <div
                                class="rightSection-spaces-window-tabs-download-tool-tips"
                            >
                                Save Session
                            </div>
                        </button>
                    </span>
                </div>
                <span class="rightSection-spaces-window-tabs-close-container">
                    <button class="rightSection-spaces-window-tabs-close-button" id="windowTabsCloseButton-${windowId}">
                        <div class="rightSection-spaces-window-tabs-close-svg"></div>
                        <div class="rightSection-spaces-window-tabs-close-tool-tips">
                            Close
                        </div>
                    </button>
                </span>
            </div>
        </div>
        <div
            class="rightSection-spaces-window-tabs-cards-container collapse"
            id= "window_${windowId}"
        >
            <div class="rightSection-spaces-window-no-tab-container none">
                <div class="rightSection-spaces-window-no-tab">No tabs</div>
            </div>
        </div>
    </div>`
}

const windowCardsFrame = (tabId, tabName, tabUrl, favIconUrl) => {
    return `
    <div class="rightSection-spaces-window-tabs-card">
        <div class="rightSection-spaces-window-tabs-url-image-container">
            <img
                class="rightSection-spaces-window-tabs-url-image"
                src="${favIconUrl}"
            />
            <div
                class="rightSection-spaces-window-tabs-check-box-container"
                tabindex="-1"
                id="check-box-container-${tabId}"
            >
                <span
                    class="rightSection-spaces-window-tabs-check-box check-box " id="check-box-${tabId}"
                ></span>
            </div>
        </div>
        <a href=${tabUrl} target="_blank" class="rightSection-spaces-window-tabs-card-title"
            >${tabName}</a
        >
        <button
            class="rightSection-spaces-window-tabs-card-close-button" id="windowTabsCardCloseButton-${tabId}"
        ></button>
    </div>`
}
const manuallyCardsFrame = (tabId, tabName, tabUrl, favIconUrl) => {
    return `
    <div class="rightSection-spaces-window-tabs-card">
        <div class="rightSection-spaces-window-tabs-url-image-container">
            <img
                class="rightSection-spaces-window-tabs-url-image"
                src="${favIconUrl}"
            />
        </div>
        <a href=${tabUrl} target="_blank" class="rightSection-spaces-window-tabs-card-title"
            >${tabName}</a
        >
        <button
            class="rightSection-spaces-window-tabs-card-close-button" id="windowTabsCardCloseButton-${tabId}"
        ></button>
    </div>`
}

const firstCollectionCardFrame = (status = "") => {
    return ` <div class="middleSection-container-collection-card-box-hover">
    <div>
        <div class="middleSection-container-collection-card-box-check-box">
            <span class="collection-card-box-check-box"></span>
        </div>
        <div class="middleSection-container-collection-card-container">
            <div
                class="middleSection-container-collection-card-container-nav"
            >
                <!--Delete-->
                <div class="middleSection-container-collection-cards-delete-box none">
                <div>
                    <span>Remove this collection? It will be removed for all shared members.</span>
                    <div class="middleSection-container-collection-cards-delete-buttons-box">
                        <button class="middleSection-container-collection-cards-cancel-buttons">
                            <span>Cancel</span>
                        </button>
                        <button class="middleSection-container-collection-cards-delete-buttons">
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
                <!--Collection Title-->
                <div
                    class="middleSection-container-collection-card-container-nav-title none"
                >
                    <h3
                        class="middleSection-container-collection-card-container-nav-title-text"
                    >
                        Untitled collection
                    </h3>
                    <div
                        class="middleSection-container-collection-card-container-nav-arrow-svg-container none"
                    >
                        <button
                            class="middleSection-container-collection-card-container-nav-arrow-svg-button" tabindex="-1"
                        >
                            <div
                                class="middleSection-container-collection-card-container-nav-arrow-down-svg"
                            ></div>
                            <div
                                class="middleSection-container-collection-card-container-nav-arrow-up-svg none"
                            ></div>
                        </button>
                    </div>
                </div>
                <!-- Edit Name -->
                <div
                    class="middleSection-container-add-collection-container"
                >
                    <input
                        id="middleSection-container-add-Name-input-${status}"
                        class="middleSection-container-add-Name-input"
                        type="text"
                        placeholder="Type the collection title"
                    />
                    <div
                        class="middleSection-container-add-collection-box-save-button-box"
                    >
                        <button
                            id="middleSection-container-add-collection-box-save-cancel-button-${status}"
                            class="middleSection-container-add-collection-box-save-cancel-button"
                            type="button"
                        >
                            <span>Cancel</span>
                        </button>
                        <button
                            id = "middleSection-container-add-collection-box-save-button"
                            class="middleSection-container-add-collection-box-save-button"
                            type="button"
                        >
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <!-- buttons -->
                <div
                    class="middleSection-container-collection-card-container-nav-buttons-box none"
                >
                    <div>
                        <span
                            class="middleSection-card-container-nav-opentab-button"
                        >
                            <div
                                class="middleSection-card-container-nav-opentab-tooltips"
                            >
                                Open tabs
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </span>
                    </div>
                    <div class="middleSection-card-container-nav-more-button-focus" tabindex="-1">
                        <span
                            class="middleSection-card-container-nav-more-button"
                        >
                            <div
                                class="middleSection-card-container-nav-more-tooltips"
                            >
                                More
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </span>
                        <div class="middleSection-card-container-nav-more-list">
                            <button class="card-container-nav-more-list-share-button">
                                <div class="card-container-nav-more-list-share-svg"></div>
                                <span>Share</span>
                            </button>
                            <hr />
                            <button class="card-container-nav-more-list-edit-title-button">
                                <div class="card-container-nav-more-list-edit-title-svg"></div>
                                <span>Edit title</span>
                            </button>
                            <hr />
                            <button class="card-container-nav-more-list-star-button">
                                <div class="card-container-nav-more-list-star-svg"></div>
                                <span>Star</span>
                            </button>
                            <hr />
                            <button class="card-container-nav-more-list-export-button">
                                <div class="card-container-nav-more-list-export-svg"></div>
                                <span>Export</span>
                            </button>
                            <hr />
                            <button class="card-container-nav-more-list-delete-button">
                                <div class="card-container-nav-more-list-delete-svg"></div>
                                <span>Delete</span>
                            </button>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <!-- Remind -->
            <div
                id="middleSection-container-remind-add-collection-box"
                class="middleSection-container-remind-add-collection-box"
            ></div>
        </div>
    </div>
</div>`
}

const initCollectionCardFrame = (collectionId, collectionName) => {
    return ` <div class="middleSection-container-collection-card-box-hover">
    <div>
        <div id="middleSection-container-collection-card-box-check-box-${collectionId}" class="middleSection-container-collection-card-box-check-box">
            <span class="collection-card-box-check-box" id="collection-check-box-${collectionId}"></span>
        </div>
        <div class="middleSection-container-collection-card-container">
            <div
                class="middleSection-container-collection-card-container-nav"
            >   
                <!--Delete-->
                <div id="middleSection-container-collection-cards-delete-box-${collectionId}" class="middleSection-container-collection-cards-delete-box none">
                <div>
                    <span>Remove this collection? It will be removed for all shared members.</span>
                    <div class="middleSection-container-collection-cards-delete-buttons-box">
                        <button id="middleSection-container-collection-cards-cancel-buttons-${collectionId}" class="middleSection-container-collection-cards-cancel-buttons">
                            <span>Cancel</span>
                        </button>
                        <button id="middleSection-container-collection-cards-delete-buttons-${collectionId}" class="middleSection-container-collection-cards-delete-buttons">
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
                <!--Collection Title-->
                <div id="middleSection-container-collection-card-container-nav-title-${collectionId}"
                    class="middleSection-container-collection-card-container-nav-title"
                >
                    <h3
                        class="middleSection-container-collection-card-container-nav-title-text"
                    >
                        ${collectionName}
                    </h3>
                    <div
                        class="middleSection-container-collection-card-container-nav-arrow-svg-container"
                    >
                        <button
                            id="middleSection-container-collection-card-container-nav-arrow-svg-button-${collectionId}"
                            class="middleSection-container-collection-card-container-nav-arrow-svg-button none" tabindex="-1"
                            data-bs-toggle="collapse"
                            data-bs-target="#middleSection-container-remind-add-collection-box-${collectionId}"
                            aria-expanded="false"
                            aria-controls="#middleSection-container-remind-add-collection-box-${collectionId}"
                        >
                            <div
                                id="middleSection-container-collection-card-container-nav-arrow-down-svg-${collectionId}"
                                class="middleSection-container-collection-card-container-nav-arrow-down-svg  none"
                            ></div>
                            <div
                                id="middleSection-container-collection-card-container-nav-arrow-up-svg-${collectionId}"
                                class="middleSection-container-collection-card-container-nav-arrow-up-svg"
                            ></div>
                        </button>
                    </div>
                </div>
                <!-- Edit Name -->
                <div id="middleSection-container-add-collection-container-${collectionId}"
                    class="middleSection-container-add-collection-container none"
                >
                    <input
                        id="middleSection-container-add-Name-input-${collectionId}"
                        class="middleSection-container-add-Name-input"
                        type="text"
                        placeholder="Type the collection title"
                    />
                    <div
                        class="middleSection-container-add-collection-box-save-button-box"
                    >
                        <button
                            id="middleSection-container-add-collection-box-save-cancel-button-${collectionId}"
                            class="middleSection-container-add-collection-box-save-cancel-button"
                            type="button"
                        >
                            <span>Cancel</span>
                        </button>
                        <button
                            id="middleSection-container-add-collection-box-save-button-${collectionId}"
                            class="middleSection-container-add-collection-box-save-button"
                            type="button"
                        >
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <!-- buttons -->
                <div id="middleSection-container-collection-card-container-nav-buttons-box-${collectionId}"
                    class="middleSection-container-collection-card-container-nav-buttons-box"
                >
                    <div>
                        <span
                            class="middleSection-card-container-nav-opentab-button"
                        >
                            <div
                                class="middleSection-card-container-nav-opentab-tooltips"
                            >
                                Open tabs
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </span>
                    </div>
                    <div id="middleSection-card-container-nav-more-button-focus-${collectionId}" class="middleSection-card-container-nav-more-button-focus" tabindex="-1">
                        <span
                            class="middleSection-card-container-nav-more-button"
                        >
                            <div
                                class="middleSection-card-container-nav-more-tooltips"
                            >
                                More
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </span>
                        <div id="middleSection-card-container-nav-more-list-${collectionId}" class="middleSection-card-container-nav-more-list">
                        <button class="card-container-nav-more-list-share-button">
                            <div class="card-container-nav-more-list-share-svg"></div>
                            <span>Share</span>
                        </button>
                        <hr />
                        <button id="card-container-nav-more-list-edit-title-button-${collectionId}" class="card-container-nav-more-list-edit-title-button">
                            <div class="card-container-nav-more-list-edit-title-svg"></div>
                            <span>Edit title</span>
                        </button>
                        <hr />
                        <button id="card-container-nav-more-list-export-button-${collectionId}" class="card-container-nav-more-list-export-button">
                            <div class="card-container-nav-more-list-export-svg"></div>
                            <span>Export</span>
                        </button>
                        <hr />
                        <button id="card-container-nav-more-list-delete-button-${collectionId}" class="card-container-nav-more-list-delete-button">
                            <div class="card-container-nav-more-list-delete-svg"></div>
                            <span>Delete</span>
                        </button>
                        <hr />
                    </div>
                    </div>
                </div>
            </div>
            <!-- Remind -->
            <div
                id="middleSection-container-remind-add-collection-box-${collectionId}"
                class="middleSection-container-remind-add-collection-box-created"
            >
            </div>
        </div>
    </div>
</div>`
}
const tabCardFrame = (tabId, tabName, tabUrl, favIconUrl, tabDescription) => {
    return ` <div class="middleSection-container-collection-tab-card-container">
    <div class="middleSection-container-collection-tab-card">
        <div class="middleSection-container-collection-tab-card-title">
                <div class="middleSection-container-collection-tab-card-check-box" id="middleSection-tab-card-box-check-box-${tabId}">
                    <span class="collection-card-box-check-box" id="tab-card-check-box-${tabId}"></span>
                </div>
                <img src="${favIconUrl}" class="middleSection-container-collection-tab-card-image tab-card-image-show-opacity" id="middleSection-container-collection-tab-card-image-${tabId}">
                <a href="${tabUrl}" target="_blank" id="middleSection-container-collection-tab-card-text-${tabId}" class="middleSection-container-collection-tab-card-text">${tabName}</a>
            </div>
            <div class="middleSection-container-collection-tab-card-cancel-description">
                <span class="middleSection-container-collection-tab-card-cancel-description-text" id="middleSection-container-collection-tab-card-description-text-${tabId}"
                    >${tabDescription}</span
                >
            </div>
            <button id="middleSection-container-collection-tab-card-delete-button-${tabId}" class="middleSection-container-collection-tab-card-delete-button"></button>
            <button id="middleSection-container-collection-tab-card-edit-button-${tabId}" class="middleSection-container-collection-tab-card-edit-button"></button>
        </div>
    </div>`
}
const tabCardTransferFrame = (newTabId, tabName, tabUrl, favIconUrl, tabDescription) => {
    return ` <div class="middleSection-container-collection-tab-card-container">
    <div class="middleSection-container-collection-tab-card">
        <div class="middleSection-container-collection-tab-card-title">
                <div class="middleSection-container-collection-tab-card-check-box" id="middleSection-tab-card-box-check-box-${newTabId}">
                    <span class="collection-card-box-check-box" id="tab-card-check-box-${newTabId}"></span>
                </div>
                <img src="${favIconUrl}" class="middleSection-container-collection-tab-card-image tab-card-image-show-opacity" id="middleSection-container-collection-tab-card-image-${newTabId}">
                <a href="${tabUrl}" target="_blank" class="middleSection-container-collection-tab-card-text" target="_blank" id="middleSection-container-collection-tab-card-text-${newTabId}">${tabName}</a>
            </div>
            <div class="middleSection-container-collection-tab-card-cancel-description">
                <span class="middleSection-container-collection-tab-card-cancel-description-text" id="middleSection-container-collection-tab-card-description-text-${newTabId}"
                    >${tabDescription}</span
                >
            </div>
            <button id="middleSection-container-collection-tab-card-delete-button-${newTabId}" class="middleSection-container-collection-tab-card-delete-button"></button>
            <button id="middleSection-container-collection-tab-card-edit-button-${newTabId}" class="middleSection-container-collection-tab-card-edit-button"></button>
        </div>
    </div>`
}
const htmlExportForm = (tabUrl, tabName) => {
    const content = `<a href="${tabUrl}">${tabName}</a><br>`
    return content
}
const OrganizationOwnerSideCardForm = (memberId, memberName, memberEmail, roleName) => {
    if (roleName === "Owner") {
        return ` 
        <div>
            <div>t</div>
            <div>
                <p class="organization-member-popover-right-box-member-name">
                    ${memberName}
                </p>
            </div>
            <div>
                <p class="organization-member-popover-right-box-member-email">
                    ${memberEmail}
                </p>
            </div>
        </div>
        <div>
            <p>${roleName}</p>
        </div>`
    } else {
        return ` 
        <div>
            <div>t</div>
            <div>
                <p class="organization-member-popover-right-box-member-name">
                    ${memberName}
                </p>
            </div>
            <div>
                <p class="organization-member-popover-right-box-member-email">
                    ${memberEmail}
                </p>
            </div>
        </div>
        <div>
            <p>${roleName}</p>
            <button
                tabindex="-1"
                id="organization-member-popover-right-box-member-edit-button-${memberId}"
                class="organization-member-popover-right-box-member-edit-button"
            ></button>
            <div
                id="organization-member-popover-right-box-member-edit-popover-${memberId}"
                class="organization-member-popover-right-box-member-edit-popover"
            >
                <div
                    id="organization-member-popover-right-box-member-edit-permission-${memberId}"
                    class="organization-member-popover-right-box-member-edit-permission"
                >
                    <div>Permissions</div>
                </div>
                <div
                    id="organization-member-popover-right-box-member-edit-remove-${memberId}"
                    class="organization-member-popover-right-box-member-edit-remove"
                >
                    <div>Remove</div>
                </div>
            </div>
        </div>`
    }
}
const OrganizationManagerSideCardForm = (memberId, memberName, memberEmail, roleName) => {
    if (roleName === "Owner") {
        return ` 
        <div>
            <div>t</div>
            <div>
                <p class="organization-member-popover-right-box-member-name">
                    ${memberName}
                </p>
            </div>
            <div>
                <p class="organization-member-popover-right-box-member-email">
                    ${memberEmail}
                </p>
            </div>
        </div>
        <div>
            <p>${roleName}</p>
        </div>`
    } else {
        return ` 
        <div>
            <div>t</div>
            <div>
                <p class="organization-member-popover-right-box-member-name">
                    ${memberName}
                </p>
            </div>
            <div>
                <p class="organization-member-popover-right-box-member-email">
                    ${memberEmail}
                </p>
            </div>
        </div>
        <div>
            <p>${roleName}</p>
            <button
                tabindex="-1"
                id="organization-member-popover-right-box-member-edit-button-${memberId}"
                class="organization-member-popover-right-box-member-edit-button"
            ></button>
            <div
                id="organization-member-popover-right-box-member-edit-popover-${memberId}"
                class="organization-member-popover-right-box-member-edit-popover none"
            >
                <button
                    id="organization-member-popover-right-box-member-edit-permission-${memberId}"
                    class="organization-member-popover-right-box-member-edit-permission" disabled 
                >
                    <div>Permissions</div>
                </button>
                <div
                    id="organization-member-popover-right-box-member-edit-remove-${memberId}"
                    class="organization-member-popover-right-box-member-edit-remove"
                >
                    <div>Remove</div>
                </div>
                </div>
            </div>
        </div>`
    }
}
const OrganizationMemberSideCardForm = (memberId, memberName, memberEmail, roleName) => {
    return ` 
        <div>
            <div>t</div>
            <div>
                <p class="organization-member-popover-right-box-member-name">
                    ${memberName}
                </p>
            </div>
            <div>
                <p class="organization-member-popover-right-box-member-email">
                    ${memberEmail}
                </p>
            </div>
        </div>
        <div>
            <p>${roleName}</p>
        </div>`
}
export {
    windowFrame,
    windowCardsFrame,
    manuallyCardsFrame,
    firstCollectionCardFrame,
    initCollectionCardFrame,
    tabCardFrame,
    tabCardTransferFrame,
    htmlExportForm,
    OrganizationMemberSideCardForm,
    OrganizationOwnerSideCardForm,
    OrganizationManagerSideCardForm,
}
