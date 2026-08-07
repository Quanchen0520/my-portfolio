import { isAdminAuthed } from "@/lib/admin-auth";
import { listProjects } from "@/lib/projects";
import { getAllViewCounts } from "@/lib/views";
import LoginForm from "@/components/admin/LoginForm";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const revalidate = 0;

export default async function AdminPage() {
  const authed = await isAdminAuthed();

  if (!authed) {
    return <LoginForm />;
  }

  const [projects, viewCounts] = await Promise.all([
    listProjects(),
    getAllViewCounts(),
  ]);

  return <AdminDashboard initialProjects={projects} viewCounts={viewCounts} />;
}
