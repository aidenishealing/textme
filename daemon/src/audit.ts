/**
 * Structured audit log for the Claude iMessage daemon.
 *
 * Writes one JSON object per line to ~/.local/log/claude-imessage-audit.jsonl
 * Only high-signal events: startup, shutdown, restarts, errors, check results,
 * message processing milestones, config changes.
 *
 * Each entry:
 *   { ts, event, detail?, duration?, meta? }
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

const LOG_DIR = path.join(os.homedir(), '.local', 'log');
const AUDIT_FILE = path.join(LOG_DIR, 'claude-imessage-audit.jsonl');

// Ensure log dir exists on import
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export type AuditEvent =
  | 'daemon_start'
  | 'daemon_stop'
  | 'daemon_crash'
  | 'pid_conflict'
  | 'stale_pid_cleared'
  | 'message_received'
  | 'message_processed'
  | 'message_error'
  | 'message_queued'
  | 'message_coalesced'
  | 'session_created'
  | 'session_killed'
  | 'interrupt'
  | 'cd'
  | 'reset'
  | 'check_poll'
  | 'check_success'
  | 'check_failure'
  | 'check_expired'
  | 'check_error'
  | 'file_sent'
  | 'transcription'
  | 'config_loaded';

interface AuditEntry {
  ts: string;
  event: AuditEvent;
  detail?: string;
  duration?: number;   // milliseconds
  meta?: Record<string, unknown>;
}

/**
 * Write a single audit log entry.
 */
export function audit(
  event: AuditEvent,
  detail?: string,
  meta?: Record<string, unknown>
): void {
  const entry: AuditEntry = {
    ts: new Date().toISOString(),
    event,
    ...(detail ? { detail } : {}),
    ...(meta ? { meta } : {}),
  };

  try {
    fs.appendFileSync(AUDIT_FILE, JSON.stringify(entry) + '\n');
  } catch (err) {
    // Fallback — don't let audit logging crash the daemon
    console.error('[Audit] Write failed:', err);
  }
}

/**
 * Convenience: audit with duration.
 */
export function auditWithDuration(
  event: AuditEvent,
  detail: string,
  durationMs: number,
  meta?: Record<string, unknown>
): void {
  const entry: AuditEntry = {
    ts: new Date().toISOString(),
    event,
    detail,
    duration: durationMs,
    ...(meta ? { meta } : {}),
  };

  try {
    fs.appendFileSync(AUDIT_FILE, JSON.stringify(entry) + '\n');
  } catch (err) {
    console.error('[Audit] Write failed:', err);
  }
}

/**
 * Read the last N audit entries (most recent first).
 */
export function getRecentAuditEntries(count: number = 20): AuditEntry[] {
  try {
    if (!fs.existsSync(AUDIT_FILE)) return [];
    const content = fs.readFileSync(AUDIT_FILE, 'utf-8').trim();
    if (!content) return [];

    const lines = content.split('\n');
    const recent = lines.slice(-count).reverse();

    return recent.map(line => {
      try {
        return JSON.parse(line) as AuditEntry;
      } catch {
        return { ts: '', event: 'daemon_start' as AuditEvent, detail: line };
      }
    });
  } catch {
    return [];
  }
}

/**
 * Format audit entries for display (mobile-friendly).
 */
export function formatAuditEntries(entries: AuditEntry[]): string {
  if (entries.length === 0) return '📋 No audit entries yet.';

  const icons: Partial<Record<AuditEvent, string>> = {
    daemon_start: '🟢',
    daemon_stop: '🔴',
    daemon_crash: '💥',
    pid_conflict: '⚠️',
    stale_pid_cleared: '🧹',
    message_received: '📩',
    message_processed: '✅',
    message_error: '❌',
    message_queued: '📥',
    message_coalesced: '🔗',
    session_created: '🆕',
    session_killed: '💀',
    interrupt: '✋',
    cd: '📂',
    reset: '🔄',
    check_poll: '🔍',
    check_success: '✅',
    check_failure: '❌',
    check_expired: '⏰',
    check_error: '⚠️',
    file_sent: '📎',
    transcription: '🎤',
    config_loaded: '⚙️',
  };

  return entries.map(e => {
    const icon = icons[e.event] || '•';
    const time = formatShortTime(e.ts);
    const dur = e.duration ? ` (${(e.duration / 1000).toFixed(1)}s)` : '';
    const detail = e.detail ? ` ${e.detail}` : '';
    return `${icon} ${time} ${e.event}${detail}${dur}`;
  }).join('\n');
}

function formatShortTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();

    // If today, show HH:MM
    if (diffMs < 24 * 60 * 60 * 1000 && d.getDate() === now.getDate()) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    // If this week, show day + time
    if (diffMs < 7 * 24 * 60 * 60 * 1000) {
      return d.toLocaleDateString('en-US', { weekday: 'short' }) + ' ' +
        d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    // Otherwise show date
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return isoString.substring(11, 16); // Fallback: just HH:MM from ISO
  }
}

export const AUDIT_FILE_PATH = AUDIT_FILE;
