"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import {
  MdSearch,
  MdFilterList,
  MdBlock,
  MdCheckCircle,
  MdEdit,
  MdMoreVert,
  MdPersonAdd,
  MdClear,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label"; // Assuming Label component exists

// Define UserRole enum locally, mirroring Prisma
enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

// Define user type
interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  isBlocked: boolean;
  createdAt: string; // ISO date string
  studentProfile?: { id: string } | null; // Simplified student profile
}

// Mock data for initial UI rendering
const mockUsersData: User[] = [
  {
    id: "user-001",
    name: "Admin User",
    email: "admin@example.com",
    role: UserRole.ADMIN,
    isBlocked: false,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "user-002",
    name: "Student User One",
    email: "student1@example.com",
    role: UserRole.STUDENT,
    isBlocked: false,
    createdAt: "2024-02-20T10:00:00Z",
    studentProfile: { id: "student-profile-001" },
  },
  {
    id: "user-003",
    name: "Instructor User",
    email: "instructor@example.com",
    role: UserRole.INSTRUCTOR,
    isBlocked: true,
    createdAt: "2024-03-10T11:00:00Z",
  },
  {
    id: "user-004",
    name: "Student User Two",
    email: "student2@example.com",
    role: UserRole.STUDENT,
    isBlocked: false,
    createdAt: "2024-04-05T14:30:00Z",
    studentProfile: { id: "student-profile-002" },
  },
  {
    id: "user-005",
    name: "Blocked Student",
    email: "blocked.student@example.com",
    role: UserRole.STUDENT,
    isBlocked: true,
    createdAt: "2023-12-01T08:00:00Z",
  },
];

const ITEMS_PER_PAGE = 10;

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(mockUsersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "blocked"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users
      .filter((user) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (user.name?.toLowerCase() || "").includes(searchLower) ||
          (user.email?.toLowerCase() || "").includes(searchLower)
        );
      })
      .filter((user) => {
        if (filterRole === "all") return true;
        return user.role === filterRole;
      })
      .filter((user) => {
        if (filterStatus === "all") return true;
        return filterStatus === "blocked" ? user.isBlocked : !user.isBlocked;
      });

    // Simple sort by creation date (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return filtered;
  }, [users, searchTerm, filterRole, filterStatus]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedUsers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / ITEMS_PER_PAGE);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleClearSearch = () => setSearchTerm("");

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openConfirmationDialog = (
    user: User,
    actionType: "block" | "unblock" | "changeRole",
    newRole?: UserRole
  ) => {
    setSelectedUser(user);
    let title = "";
    let description = "";
    let actionFunction: () => void;

    if (actionType === "block") {
      title = `Block User: ${user.name || user.email}?`;
      description =
        "Blocking this user will prevent them from accessing the platform. Are you sure?";
      actionFunction = () => handleBlockToggle(user, true);
    } else if (actionType === "unblock") {
      title = `Unblock User: ${user.name || user.email}?`;
      description =
        "Unblocking this user will restore their access to the platform. Are you sure?";
      actionFunction = () => handleBlockToggle(user, false);
    } else if (actionType === "changeRole" && newRole) {
      title = `Change Role for ${user.name || user.email}?`;
      description = `Are you sure you want to change this user's role to ${newRole}?`;
      actionFunction = () => handleChangeRole(user, newRole);
    } else {
      return; // Should not happen
    }

    setDialogContent({ title, description });
    setDialogAction(() => actionFunction); // Store the function itself
    setIsConfirmDialogOpen(true);
  };

  const handleBlockToggle = async (userToUpdate: User, block: boolean) => {
    console.log(`${block ? "Blocking" : "Unblocking"} user:`, userToUpdate);
    // TODO: Implement API call
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userToUpdate.id ? { ...u, isBlocked: block } : u
      )
    );
    setIsConfirmDialogOpen(false);
    setSelectedUser(null);
  };

  const handleChangeRole = async (userToUpdate: User, newRole: UserRole) => {
    console.log(`Changing role for ${userToUpdate.name} to ${newRole}`);
    // TODO: Implement API call
    // If role changes to STUDENT, and no studentProfile exists, one might need to be created.
    // This logic would typically be on the backend.
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userToUpdate.id ? { ...u, role: newRole } : u
      )
    );
    setIsConfirmDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-myprimary">
          User Management
        </h1>
        {/* <Button className="flex items-center gap-2">
          <MdPersonAdd className="h-5 w-5" /> Add New User 
        </Button> 
        // Add User functionality can be added later if needed, for now focusing on managing existing users.
        */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            View, manage, and update user accounts and roles.
          </CardDescription>
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-2 flex-wrap">
            <div className="relative flex-grow min-w-[200px] md:min-w-[300px]">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users (name, email)..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={handleClearSearch}
                >
                  <MdClear className="h-5 w-5" />
                </Button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 min-w-[150px] justify-between"
                >
                  <span>Role: {filterRole === "all" ? "All" : filterRole}</span>{" "}
                  <MdFilterList className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterRole("all")}>
                  All Roles
                </DropdownMenuItem>
                {Object.values(UserRole).map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => setFilterRole(role)}
                  >
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 min-w-[150px] justify-between"
                >
                  <span>
                    Status:{" "}
                    {filterStatus === "all"
                      ? "All"
                      : filterStatus.charAt(0).toUpperCase() +
                        filterStatus.slice(1)}
                  </span>{" "}
                  <MdFilterList className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("blocked")}>
                  Blocked
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {paginatedUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || "N/A"}
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === UserRole.ADMIN
                            ? "default"
                            : user.role === UserRole.INSTRUCTOR
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={user.isBlocked ? "destructive" : "default"}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MdMoreVert className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {user.isBlocked ? (
                            <DropdownMenuItem
                              onClick={() =>
                                openConfirmationDialog(user, "unblock")
                              }
                              className="flex items-center gap-2"
                            >
                              <MdCheckCircle className="h-4 w-4 text-green-500" />{" "}
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                openConfirmationDialog(user, "block")
                              }
                              className="flex items-center gap-2"
                            >
                              <MdBlock className="h-4 w-4 text-red-500" /> Block
                              User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center gap-2">
                              <MdEdit className="h-4 w-4" /> Change Role
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuLabel>
                                  Set Role To
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {Object.values(UserRole).map((role) => (
                                  <DropdownMenuItem
                                    key={role}
                                    disabled={user.role === role}
                                    onClick={() =>
                                      openConfirmationDialog(
                                        user,
                                        "changeRole",
                                        role
                                      )
                                    }
                                  >
                                    {role} {user.role === role && "(Current)"}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          {/* 
                           // Future: Edit user details
                           <DropdownMenuItem asChild>
                            <Link href={`/admin-v2/users/edit/${user.id}`} className="flex items-center gap-2">
                                <MdEdit className="h-4 w-4" /> Edit Details
                            </Link>
                           </DropdownMenuItem> 
                           */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No users found matching your criteria.
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={
                dialogContent.title.toLowerCase().includes("block")
                  ? "destructive"
                  : "default"
              }
              onClick={() => {
                if (dialogAction) {
                  dialogAction();
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
