<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Preview of Atto editor content
 *
 * @package   atto_preview
 * @copyright 2015 Daniel Thies
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once('../../../../../config.php');

$contextid = required_param('contextid', PARAM_INT);
$content = required_param('content', PARAM_CLEANHTML);

list($context, $course, $cm) = get_context_info_array($contextid);
$PAGE->set_context($context);
$PAGE->set_url('/lib/editor/atto/plugins/preview/preview.php');
$PAGE->set_pagelayout('print');

require_login($course, false, $cm);
require_sesskey();

print $OUTPUT->header();

// Output filtered content.
print $OUTPUT->container(format_text($content), 'editor-content');

print $OUTPUT->footer();
