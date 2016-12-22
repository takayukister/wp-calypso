/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';

/**
 * Internal dependencies
 */
import wrapSettingsForm from './wrap-settings-form';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormLegend from 'components/forms/form-legend';
import FormTextarea from 'components/forms/form-textarea';
import FormTextInput from 'components/forms/form-text-input';
import FormCheckbox from 'components/forms/form-checkbox';
import FormSelect from 'components/forms/form-select';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import Card from 'components/card';
import Button from 'components/button';
import SectionHeader from 'components/section-header';
import { isJetpackSite, isJetpackModuleActive } from 'state/sites/selectors';

class SiteSettingsFormDiscussion extends Component {
	onTrackSelectAndStop = recordObject => clickEvent => {
		this.trackSelect( recordObject );
		clickEvent.preventDefault();
	};

	defaultArticleSettings() {
		const { clickTracker, fields, handleCheckbox, isRequestingSettings, translate } = this.props;
		return (
			<FormFieldset>
				<FormLegend>{ translate( 'Default article settings' ) }</FormLegend>
				<FormLabel>
					<FormCheckbox
						name="default_pingback_flag"
						checked={ !! fields.default_pingback_flag }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Attempt to Notify Checkbox' ) } />
					<span>{ translate( 'Attempt to notify any blogs linked to from the article' ) }</span>
				</FormLabel>
				<FormLabel>
					<FormCheckbox
						name="default_ping_status"
						checked={ !! fields.default_ping_status }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Allow Link Notifications Checkbox' ) } />
					<span>{ translate( 'Allow link notifications from other blogs (pingbacks and trackbacks)' ) }</span>
				</FormLabel>
				<FormLabel>
					<FormCheckbox
						name="default_comment_status"
						checked={ !! fields.default_comment_status }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Allow People to Post Comments Checkbox' ) } />
					<span>{ translate( 'Allow people to post comments on new articles' ) }</span>
				</FormLabel>
				<FormSettingExplanation>
						{ translate( '(These settings may be overridden for individual articles.)' ) }
				</FormSettingExplanation>
			</FormFieldset>
		);
	}

	otherCommentSettings() {
		const {
			clickTracker, fields, handleCheckbox, isRequestingSettings, onChangeField, selectTracker, translate, typeTracker
		} = this.props;
		const markdownSupported = fields.markdown_supported;
		return (
			<FormFieldset className="has-divider">
				<FormLabel>{ translate( 'Other comment settings' ) }</FormLabel>
				<FormLabel>
					<FormCheckbox
						name="require_name_email"
						checked={ !! fields.require_name_email }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Comment Author Must Fill Checkbox' ) } />
					<span>{ translate( 'Comment author must fill out name and e-mail' ) }</span>
				</FormLabel>
				<FormLabel>
					<FormCheckbox
						name="comment_registration"
						checked={ !! fields.comment_registration }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Users Must Be Registered Checkbox' ) } />
					<span>{ translate( 'Users must be registered and logged in to comment' ) }</span>
				</FormLabel>
				<FormLabel>
					<FormCheckbox
						name="close_comments_for_old_posts"
						checked={ !! fields.close_comments_for_old_posts }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Automatically Close Days Checkbox' ) } />
					<span>{
						translate(
							'Automatically close comments on articles older than {{numberOfDays /}} day',
							'Automatically close comments on articles older than {{numberOfDays /}} days', {
								count: fields.close_comments_days_old || 2,
								components: {
									numberOfDays: <FormTextInput
										name="close_comments_days_old"
										type="number"
										min="0"
										step="1"
										id="close_comments_days_old"
										className="small-text"
										value={ fields.close_comments_days_old || '' }
										onChange={ onChangeField( 'close_comments_days_old' ) }
										disabled={ isRequestingSettings }
										onClick={ clickTracker( 'Automatically Close Days Field' ) }
										onKeyPress={
											typeTracker( 'Automatically Close Days Field' )
										}
									/>
								}
							} )
						}</span>
				</FormLabel>
				<FormLabel>
					<FormCheckbox
						name="thread_comments"
						checked={ !! fields.thread_comments }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Enable Threaded Checkbox' ) } />
					<span>{
						translate( 'Enable threaded (nested) comments up to {{number /}} levels deep', {
							components: {
								number: <FormSelect
									className="is-compact"
									name="thread_comments_depth"
									value={ fields.thread_comments_depth }
									onChange={ onChangeField( 'thread_comments_depth' ) }
									disabled={ isRequestingSettings }
									onClick={ this.onTrackSelectAndStop( 'Comment Nesting Level' ) }>
										{ [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map( level =>
											<option value={ level } key={ 'comment-depth-' + level }>{ level }</option>
										) }
								</FormSelect>
							}
						} )
						}</span>
				</FormLabel>
				<FormLabel>
					<FormCheckbox
						name="page_comments"
						id="page_comments"
						checked={ !! fields.page_comments }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Break Comments Into Pages Checkbox' ) } />
					<span>{
						translate( 'Break comments into pages with {{numComments /}} top level comments per page and the {{firstOrLast /}} page displayed by default', {
							components: {
								numComments: <FormTextInput
									name="comments_per_page"
									type="number"
									step="1"
									min="0"
									id="comments_per_page"
									value={ fields.comments_per_page || '' }
									onChange={ onChangeField( 'comments_per_page' ) }
									className="small-text"
									disabled={ isRequestingSettings }
									onClick={ clickTracker( 'Comments Per Page Field' ) }
									onKeyPress={ typeTracker( 'Comments Per Page Field' ) } />,
								firstOrLast: <FormSelect
									className="is-compact"
									name="default_comments_page"
									value={ fields.default_comments_page }
									onChange={ onChangeField( 'default_comments_page' ) }
									disabled={ isRequestingSettings }
									onClick={ this.onTrackSelectAndStop( 'Comment Page Display Default' ) }>
										<option value="newest">{ translate( 'last' ) }</option>
										<option value="oldest">{ translate( 'first' ) }</option>
								</FormSelect>
							}
						} )
						}</span>
				</FormLabel>
				{ markdownSupported &&
					<FormLabel>
						<FormCheckbox
							name="wpcom_publish_comments_with_markdown"
							checked={ !! fields.wpcom_publish_comments_with_markdown }
							onChange={ handleCheckbox }
							disabled={ isRequestingSettings }
							onClick={ clickTracker( 'Markdown for Comments Checkbox' ) } />
						<span>
							{ translate( 'Enable Markdown for comments. {{a}}Learn more about markdown{{/a}}.', {
								components: {
									a: <a
										href="http://en.support.wordpress.com/markdown-quick-reference/"
										target="_blank"
										rel="noopener noreferrer"
									/>
								}
							} ) }
						</span>
					</FormLabel>
				}
				<FormLabel>
					<span>{
						translate( 'Comments should be displayed with the {{olderOrNewer /}} comments at the top of each page', {
							components: {
								olderOrNewer: <FormSelect
									className="is-compact"
									name="comment_order"
									value={ fields.comment_order }
									onChange={ onChangeField( 'comment_order' ) }
									disabled={ isRequestingSettings }
									onClick={ selectTracker( 'Comment Order on Page' ) }>
										<option value="asc">{ translate( 'older', { textOnly: true } ) }</option>
										<option value="desc">{ translate( 'newer', { textOnly: true } ) }</option>
								</FormSelect>
							}
						} )
						}</span>
				</FormLabel>
			</FormFieldset>
		);
	}

	emailMeSettings() {
		const { clickTracker, fields, handleCheckbox, isRequestingSettings, translate } = this.props;
		return (
			<FormFieldset>
				<FormLegend>{ translate( 'E-mail me whenever' ) }</FormLegend>
				<FormLabel className="short-settings">
					<FormCheckbox
						name="comments_notify"
						checked={ !! fields.comments_notify }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Anyone Posts a Comment Checkbox' ) } />
					<span>{ translate( 'Anyone posts a comment' ) }</span>
				</FormLabel>
				<FormLabel className="short-settings">
					<FormCheckbox
						name="moderation_notify"
						checked={ !! fields.moderation_notify }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'a Comment is Held Checkbox' ) } />
					<span>{ translate( 'A comment is held for moderation' ) }</span>
				</FormLabel>
				{ this.emailMeLikes() }
				{ this.emailMeReblogs() }
				{ this.emailMeFollows() }
			</FormFieldset>
		);
	}

	emailMeLikes() {
		const { clickTracker, fields, handleCheckbox, isJetpack, isLikesModuleActive, isRequestingSettings, translate } = this.props;
		// likes are only supported on jetpack sites with the Likes module activated
		if ( isJetpack && ! isLikesModuleActive ) {
			return null;
		}

		return (
			<FormLabel className="short-settings">
				<FormCheckbox
					name="social_notifications_like"
					checked={ !! fields.social_notifications_like }
					onChange={ handleCheckbox }
					disabled={ isRequestingSettings }
					onClick={ clickTracker( 'Someone Likes Checkbox' ) } />
				<span>{ translate( 'Someone likes one of my posts' ) }</span>
			</FormLabel>
		);
	}

	emailMeReblogs() {
		const { clickTracker, fields, handleCheckbox, isJetpack, isRequestingSettings, translate } = this.props;
		// reblogs are not supported on Jetpack sites
		if ( isJetpack ) {
			return null;
		}

		return (
			<FormLabel className="short-settings">
				<FormCheckbox
					name="social_notifications_reblog"
					checked={ !! fields.social_notifications_reblog }
					onChange={ handleCheckbox }
					disabled={ isRequestingSettings }
					onClick={ clickTracker( 'Someone Reblogs Checkbox' ) } />
				<span>{ translate( 'Someone reblogs one of my posts' ) }</span>
			</FormLabel>
		);
	}

	emailMeFollows() {
		const { clickTracker, fields, handleCheckbox, isJetpack, isRequestingSettings, translate } = this.props;
		// follows are not supported on Jetpack sites
		if ( isJetpack ) {
			return null;
		}

		return (
			<FormLabel className="short-settings">
				<FormCheckbox
					name="social_notifications_subscribe"
					checked={ !! fields.social_notifications_subscribe }
					onChange={ handleCheckbox }
					disabled={ isRequestingSettings }
					onClick={ clickTracker( 'Someone Follows Checkbox' ) } />
				<span>{ translate( 'Someone follows my blog' ) }</span>
			</FormLabel>
		);
	}

	beforeCommentSettings() {
		const { clickTracker, fields, handleCheckbox, isRequestingSettings, translate } = this.props;
		return (
			<FormFieldset>
				<FormLegend>{ translate( 'Before a comment appears' ) }</FormLegend>
				<FormLabel className="short-settings">
					<FormCheckbox
						name="comment_moderation"
						checked={ !! fields.comment_moderation }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Comment Manually Approved Checkbox' ) } />
					<span>{ translate( 'Comment must be manually approved' ) }</span>
				</FormLabel>
				<FormLabel className="short-settings">
					<FormCheckbox
						name="comment_whitelist"
						checked={ !! fields.comment_whitelist }
						onChange={ handleCheckbox }
						disabled={ isRequestingSettings }
						onClick={ clickTracker( 'Comment Previously Approved Checkbox' ) } />
					<span>{ translate( 'Comment author must have a previously approved comment' ) }</span>
				</FormLabel>
			</FormFieldset>
		);
	}

	commentModerationSettings() {
		const { clickTracker, fields, isRequestingSettings, onChangeField, translate, typeTracker } = this.props;
		return (
			<FormFieldset className="has-divider">
				<FormLabel htmlFor="moderation_keys">{ translate( 'Comment Moderation' ) }</FormLabel>
				<p>{
					translate( 'Hold a comment in the queue if it contains {{numberOfLinks /}} or more links. (A common characteristic of comment spam is a large number of hyperlinks.)', {
						components: {
							numberOfLinks: <FormTextInput
								name="comment_max_links"
								type="number"
								step="1"
								min="0"
								className="small-text"
								value={ fields.comment_max_links || '' }
								onChange={ onChangeField( 'comment_max_links' ) }
								disabled={ isRequestingSettings }
								onClick={ clickTracker( 'Comment Queue Link Count Field' ) }
								onKeyPress={ typeTracker( 'Comment Queue Link Count Field' ) } />
						}
					} )
				}</p>
				<p>{
					translate( 'When a comment contains any of these words in its content, name, URL, e-mail, or IP, it will be held in the {{link}}moderation queue{{/link}}. One word or IP per line. It will match inside words, so "press" will match "WordPress".',
						{
							components: {
								link: <a href={ fields.admin_url + 'edit-comments.php?comment_status=moderated' } target="_blank" rel="noopener noreferrer" />
							}
						}
					)
					}</p>
				<p>
					<FormTextarea
						name="moderation_keys"
						id="moderation_keys"
						value={ fields.moderation_keys }
						onChange={ onChangeField( 'moderation_keys' ) }
						disabled={ isRequestingSettings }
						autoCapitalize="none"
						onClick={ clickTracker( 'Moderation Queue Field' ) }
						onKeyPress={ typeTracker( 'Moderation Queue Field' ) }>
					</FormTextarea>
				</p>
			</FormFieldset>
		);
	}

	commentBlacklistSettings() {
		const { clickTracker, fields, isRequestingSettings, onChangeField, translate, typeTracker } = this.props;
		return (
			<FormFieldset>
				<FormLabel htmlFor="blacklist_keys">{ translate( 'Comment Blacklist' ) }</FormLabel>
				<p>{ translate( 'When a comment contains any of these words in its content, name, URL, e-mail, or IP, it will be marked as spam. One word or IP per line. It will match inside words, so "press" will match "WordPress".' ) }</p>
				<p>
					<FormTextarea
						name="blacklist_keys"
						id="blacklist_keys"
						value={ fields.blacklist_keys }
						onChange={ onChangeField( 'blacklist_keys' ) }
						disabled={ isRequestingSettings }
						autoCapitalize="none"
						onClick={ clickTracker( 'Blacklist Field' ) }
						onKeyPress={ typeTracker( 'Blacklist Field' ) }>
					</FormTextarea>
				</p>
			</FormFieldset>
		);
	}

	render() {
		const { handleSubmitForm, isRequestingSettings, isSavingSettings, translate } = this.props;
		return (
			<form id="site-settings" onSubmit={ handleSubmitForm } onChange={ this.props.markChanged }>
				<SectionHeader label={ translate( 'Discussion Settings' ) }>
					<Button
						primary
						compact
						disabled={ isRequestingSettings || isSavingSettings }
						onClick={ handleSubmitForm }>
						{ isSavingSettings ? translate( 'Saving…' ) : translate( 'Save Settings' ) }
					</Button>
				</SectionHeader>
				<Card className="discussion-settings">
					{ this.defaultArticleSettings() }
					{ this.otherCommentSettings() }
					{ this.emailMeSettings() }
					{ this.beforeCommentSettings() }
					{ this.commentModerationSettings() }
					{ this.commentBlacklistSettings() }
				</Card>
			</form>
		);
	}
}

const connectComponent = connect(
	( state, { siteId } ) => {
		const isJetpack = isJetpackSite( state, siteId );
		const isLikesModuleActive = isJetpackModuleActive( state, siteId, 'likes' );

		return {
			isJetpack,
			isLikesModuleActive,
		};
	}
);

const getFormSettings = settings => {
	if ( ! settings ) {
		return {};
	}

	const discussionAttributes = [
		'default_pingback_flag',
		'default_ping_status',
		'default_comment_status',
		'require_name_email',
		'comment_registration',
		'close_comments_for_old_posts',
		'close_comments_days_old',
		'thread_comments',
		'thread_comments_depth',
		'page_comments',
		'comments_per_page',
		'default_comments_page',
		'comment_order',
		'comments_notify',
		'moderation_notify',
		'social_notifications_like',
		'social_notifications_reblog',
		'social_notifications_subscribe',
		'comment_moderation',
		'comment_whitelist',
		'comment_max_links',
		'moderation_keys',
		'blacklist_keys',
		'admin_url',
		'wpcom_publish_comments_with_markdown',
		'markdown_supported',
	];

	return discussionAttributes.reduce( ( memo, attribute ) => {
		memo[ attribute ] = settings[ attribute ];
		return memo;
	}, {} );
};

export default flowRight(
	connectComponent,
	wrapSettingsForm( getFormSettings )
)( SiteSettingsFormDiscussion );
