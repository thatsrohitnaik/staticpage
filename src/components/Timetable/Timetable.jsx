import React, { useState, useMemo } from 'react';
import './Timetable.css';

const DEFAULT_EVENTS = [
	{
		time: '06:30 AM',
		title: 'Ganesh Puja & Shubh Muhurat',
		location: 'Home / Pandal',
		notes: 'Seek blessings to begin the auspicious day.',
	},
	{
		time: '08:00 AM',
		title: 'Haldi Ceremony',
		location: 'Home / Venue Lawn',
		notes: 'Close family only - turmeric application.',
	},
	{
		time: '10:30 AM',
		title: 'Baraat Arrival',
		location: 'Venue Entrance',
		notes: 'Groom procession arrives with music.',
	},
	{
		time: '11:00 AM',
		title: 'Jaimala (Varmala)',
		location: 'Stage',
		notes: 'Exchange of garlands between the couple.',
	},
	{
		time: '11:30 AM',
		title: 'Kanyadaan',
		location: 'Mandap',
		notes: 'Giving away of the bride by parents.',
	},
	{
		time: '12:00 PM',
		title: 'Saat Phere (Saptapadi)',
		location: 'Mandap',
		notes: 'Seven sacred rounds around the holy fire.',
	},
	{
		time: '01:00 PM',
		title: 'Sindoor & Mangalsutra',
		location: 'Mandap',
		notes: 'Final rituals to officially unite the couple.',
	},
	{
		time: '01:30 PM',
		title: 'Lunch / Bhog',
		location: 'Dining Area',
		notes: 'Traditional vegetarian meal served.',
	},
	{
		time: '05:00 PM',
		title: 'Reception / Evening Celebrations',
		location: 'Banquet Hall',
		notes: 'Music, dinner and blessings from guests.',
	},
];

function timeToPeriod(timeStr) {
	// expects format like "HH:MM AM/PM"
	const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
	if (!match) return 'Other';
	let hour = parseInt(match[1], 10);
	const meridian = match[3].toUpperCase();
	if (meridian === 'PM' && hour !== 12) hour += 12;
	if (meridian === 'AM' && hour === 12) hour = 0;
	if (hour < 12) return 'Morning';
	if (hour < 17) return 'Afternoon';
	return 'Evening';
}

export default function Timetable({
	events = DEFAULT_EVENTS,
	title = 'Wedding Day Timetable',
	date,
}) {
	const [openGroups, setOpenGroups] = useState(() => ({
		Morning: true,
		Afternoon: false,
		Evening: false,
	}));
	const grouped = useMemo(() => {
		const g = { Morning: [], Afternoon: [], Evening: [], Other: [] };
		(events || []).forEach((e) => {
			const p = timeToPeriod(e.time);
			g[p] = g[p] || [];
			g[p].push(e);
		});
		return g;
	}, [events]);

	const toggleGroup = (name) =>
		setOpenGroups((s) => ({ ...s, [name]: !s[name] }));

	return (
		<section className="timetable" aria-label="Wedding day timetable">
			<div className="timetable-card">
				<header className="timetable-header">
					<h3 className="timetable-title">{title}</h3>
					{date && <div className="timetable-date">{date}</div>}
				</header>

				<div className="timetable-body" role="region" aria-live="polite">
					<nav className="tree" aria-label="Schedule tree">
						<ul role="tree" className="tree-root">
							{Object.keys(grouped).map(
								(group) =>
									grouped[group].length > 0 && (
										<li
											role="treeitem"
											aria-expanded={!!openGroups[group]}
											key={group}
											className="tree-group"
										>
											<button
												className="tree-toggle"
												onClick={() => toggleGroup(group)}
												aria-controls={`grp-${group}`}
												aria-expanded={!!openGroups[group]}
											>
												<span
													className="tree-caret"
													aria-hidden
												>
													{openGroups[group] ? '▾' : '▸'}
												</span>
												<span className="tree-label">
													{group}{' '}
													<span className="count">
														({grouped[group].length})
													</span>
												</span>
											</button>

											<ul
												role="group"
												id={`grp-${group}`}
												className={`tree-branch ${
													openGroups[group] ? 'open' : ''
												}`}
											>
												{grouped[group].map((ev, i) => (
													<li
														role="treeitem"
														key={`${group}-${i}`}
														className="tree-leaf"
													>
														<div className="leaf-row">
															<span className="leaf-time">
																{ev.time}
															</span>
															<div className="leaf-body">
																<div className="leaf-title">
																	{ev.title}
																</div>
																<div className="leaf-meta">
																	<strong>Location:</strong>{' '}
																	{ev.location}
																</div>
																<div className="leaf-meta">
																	<strong>Notes:</strong>{' '}
																	{ev.notes}
																</div>
															</div>
														</div>
													</li>
												))}
											</ul>
										</li>
									)
							)}
						</ul>
					</nav>
				</div>
			</div>
		</section>
	);
}
