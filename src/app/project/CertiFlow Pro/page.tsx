'use client';

import { useEffect } from 'next/navigation';import { redirect } from 'next/navigation';

export default function LegacyCertiFlowPage() {
	redirect('/project/certiflow-pro');
}
